// Native
const { join } = require('path')

// Packages
const command = require('probot-commands')

// Ours
const ensure = require('./lib/ensure')
const test = require('./lib/test')
const update = require('./lib/update')

module.exports = robot => {
  // Ensures all dependencies are resolved before the PR can be merged
  //
  // Triggered when you write:
  //    /COMMAND arguments
  command(robot, 'depends', ensure)
  command(robot, 'ensure', ensure)

  // Run tests when a PR has changed
  robot.on('pull_request.opened', test)
  robot.on('pull_request.reopened', test)
  robot.on('pull_request.synchronize', test)

  // Re-check on dependency updates
  robot.on('issues.closed', update)
  robot.on('issues.reopened', update)
  robot.on('pull_request.reopened', update)
  robot.on('pull_request.closed', update)

  // Get an express router to expose new HTTP endpoints
  const app = robot.route('/')

  // Index page
  app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'))
  })
}
