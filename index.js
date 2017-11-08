// Packages
const command = require('probot-commands')

// Ours
const ensure = require('./lib/ensure')

module.exports = robot => {
	// Ensures all dependencies are resolved before the PR can be merged
	//
	// Triggered when you write:
	// 		/COMMAND #1, #2
	//
	// Where a COMMAND can be either 'ensure', or 'depends'
	command(robot, 'ensure', ensure)
	command(robot, 'depends', ensure)
}
