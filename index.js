// Packages
const command = require('probot-commands')

// Ours
const ensure = require('./lib/ensure')
const test = require('./lib/test')

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
}
