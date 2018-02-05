jest.mock('./run')

// Packages
const { createRobot } = require('probot')

// Ours
const app = require('../index')
const events = require('./events')
const run = require('./run')

// Globals
let robot, github, repo, sha, deps

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
      get: jest.fn().mockReturnValue({
        data: {
          body: 'depends on #1, depends on #2, depends on #3',
          head: { sha: '123' }
        }
      })
    },
    paginate: (fn, cb) => cb(fn),
    repos: { createStatus: jest.fn() }
  }

  // Passes the mocked out GitHub API into out robot instance
  robot.auth = () => Promise.resolve(github)

  // Constants
  repo = { repo: 'test', owner: 'user' }
  sha = '123'
  deps = [1, 2, 3]
})

test('re-checking the status', async () => {
  await robot.receive(events.issues_closed)
  expect(run).toHaveBeenCalledWith(expect.any(Object), repo, sha, deps)

  await robot.receive(events.issues_reopened)
  expect(run).toHaveBeenCalledWith(expect.any(Object), repo, sha, deps)

  await robot.receive(events.pull_request_closed)
  expect(run).toHaveBeenCalledWith(expect.any(Object), repo, sha, deps)

  await robot.receive(events.pull_request_reopened)
  expect(run).toHaveBeenCalledWith(expect.any(Object), repo, sha, deps)
})
