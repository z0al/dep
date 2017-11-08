// Packages
const { createRobot } = require('probot')

// Ours
const app = require('../index')
const events = require('./events')

// Globals
let robot
let github

// Mock everything
beforeEach(() => {
	// Here we create a robot instance
	robot = createRobot()

	// Here we initialize the app on the robot instance
	app(robot)

	// Mock GitHub client
	github = {
		issues: {
			addLabels: jest.fn()
		}
	}

	// Passes the mocked out GitHub API into out robot instance
	robot.auth = () => Promise.resolve(github)
})

test('processing PR comments', async () => {
	await robot.receive(events.pr_comment_created)
	expect(github.issues.addLabels).toBeCalled()
})

test('processing plain issue comments', async () => {
	await robot.receive(events.issue_comment_created)
	expect(github.issues.addLabels).not.toBeCalled()
})

test('adding labels', async () => {
	await robot.receive(events.pr_comment_created)
	expect(github.issues.addLabels).toBeCalledWith({
		labels: ['needs[1]', 'needs[2]'],
		owner: 'user',
		repo: 'test',
		number: 1
	})
})
