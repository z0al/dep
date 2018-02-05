// Packages
const { createRobot } = require('probot')

// Ours
const app = require('../index')
const events = require('./events')
const toggle = require('../lib/toggle')

// Globals
let robot, github

// Mock everything
beforeEach(() => {
  // Here we create a robot instance
  robot = createRobot()

  // Here we initialize the app on the robot instance
  app(robot)

  // Mock GitHub client
  github = {
    issues: {
      addLabels: jest.fn(),
      removeLabel: jest.fn()
    }
  }

  // Passes the mocked out GitHub API into out robot instance
  robot.auth = () => Promise.resolve(github)
})

test('add the label if there are some dependencies', async () => {
  await robot.receive(events.pull_request_edited)
  expect(github.issues.addLabels).toHaveBeenCalled()
  expect(github.issues.removeLabel).not.toHaveBeenCalled()
})

test('remove the label if there are no dependencies', async () => {
  await robot.receive(events.pull_request_opened)
  expect(github.issues.addLabels).not.toHaveBeenCalled()
  expect(github.issues.removeLabel).toHaveBeenCalled()
})
