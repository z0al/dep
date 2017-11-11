jest.mock('../lib/report')
// Packages
const metadata = require('probot-metadata')
const { createRobot } = require('probot')

// Ours
const app = require('../index')
const events = require('./events')
const report = require('../lib/report')

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
      get: jest
        .fn()
        .mockReturnValueOnce({ data: { state: 'closed' } })
        .mockReturnValue({ data: { state: 'open' } })
    },
    repos: { createStatus: jest.fn() }
  }

  // Passes the mocked out GitHub API into out robot instance
  robot.auth = () => Promise.resolve(github)
})

test('getting stored metadata', async () => {
  await robot.receive(events.pull_request_opened)
  expect(metadata().get).toHaveBeenCalledWith('dependencies')

  await robot.receive(events.pull_request_reopened)
  expect(metadata().get).toHaveBeenLastCalledWith('dependencies')

  await robot.receive(events.pull_request_synchronize)
  expect(metadata().get).toHaveBeenLastCalledWith('dependencies')

  expect(metadata().get).toHaveBeenCalledTimes(3)
})

test('getting issue states', async () => {
  await robot.receive(events.pull_request_opened)

  expect(github.issues.get).toHaveBeenCalledWith(
    expect.objectContaining({ number: expect.any(Number) })
  )
  expect(github.issues.get).toHaveBeenCalledTimes(3)
})

test('reporting', async () => {
  await robot.receive(events.pull_request_opened)

  expect(report).toHaveBeenLastCalledWith(
    expect.any(Object),
    expect.any(String),
    expect.any(String),
    expect.any(String),
    'failure',
    [2, 3]
  )
})
