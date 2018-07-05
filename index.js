// Native
const { join } = require('path')

// Packages
const command = require('probot-commands')

// Ours
const deprecate = require('./lib/helpers/deprecate')
const toggle = require('./lib/toggle')
const update = require('./lib/update')

module.exports = robot => {
  // Deprecated!
  command(robot, 'depends', deprecate)
  command(robot, 'ensure', deprecate)

  // Toggle label
  robot.on('pull_request.opened', toggle)
  robot.on('pull_request.edited', toggle)

  // Re-check on dependency updates
  robot.on('issues.closed', update)
  robot.on('issues.reopened', update)
  robot.on('pull_request.reopened', update)
  robot.on('pull_request.closed', update)
  robot.on('pull_request.synchronize', update)

  // Get an express router to expose new HTTP endpoints
  const app = robot.route('/')

  // Index page
  app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'))
  })
}
