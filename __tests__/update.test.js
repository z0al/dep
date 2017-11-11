jest.mock('../lib/check')

// Packages
const metadata = require('probot-metadata')
const { createRobot } = require('probot')

// Ours
const app = require('../index')
const events = require('./events')
const check = require('../lib/check')

// Globals
let robot, github, owner, repo, sha, deps

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
        .mockReturnValue({ data: { state: 'open' } }),
      getForRepo: jest
        .fn()
        .mockReturnValue({ data: [{ number: 1, pull_request: {} }] })
    },
    pullRequests: {
      get: jest.fn().mockReturnValue({ data: { head: { sha: '123' } } })
    },
    paginate: (fn, cb) => cb(fn),
    repos: { createStatus: jest.fn() }
  }

  // Passes the mocked out GitHub API into out robot instance
  robot.auth = () => Promise.resolve(github)

  // Constants
  owner = 'user'
  repo = 'test'
  sha = '123'
  deps = [1, 2, 3]
})

test('getting stored metadata', async () => {
  await robot.receive(events.issues_closed)
  expect(metadata().get).toHaveBeenCalledWith('dependencies')

  await robot.receive(events.issues_reopened)
  expect(metadata().get).toHaveBeenCalledWith('dependencies')

  await robot.receive(events.pull_request_closed)
  expect(metadata().get).toHaveBeenCalledWith('dependencies')

  await robot.receive(events.pull_request_reopened)
  expect(metadata().get).toHaveBeenCalledWith('dependencies')
})

test('re-checking the status', async () => {
  await robot.receive(events.issues_closed)
  expect(check).toHaveBeenCalledWith(expect.any(Object), owner, repo, sha, deps)

  await robot.receive(events.issues_reopened)
  expect(check).toHaveBeenCalledWith(expect.any(Object), owner, repo, sha, deps)

  await robot.receive(events.pull_request_closed)
  expect(check).toHaveBeenCalledWith(expect.any(Object), owner, repo, sha, deps)

  await robot.receive(events.pull_request_reopened)
  expect(check).toHaveBeenCalledWith(expect.any(Object), owner, repo, sha, deps)
})
