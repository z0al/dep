jest.mock('../lib/check')

// Packages
const metadata = require('probot-metadata')
const { createRobot } = require('probot')

// Ours
const app = require('../index')
const check = require('../lib/check')
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
      addLabels: jest.fn(),
      removeLabel: jest.fn()
    },
    pullRequests: {
      get: jest.fn().mockReturnValue({ data: { head: { sha: '123' } } })
    },
    repos: {
      reviewUserPermissionLevel: jest
        .fn()
        .mockReturnValue({ data: { permission: 'write' } })
    }
  }

  // Passes the mocked out GitHub API into out robot instance
  robot.auth = () => Promise.resolve(github)
})

test('checking permission (old synatx)', async () => {
  await robot.receive(events.pr_comment_created_old)
  expect(github.repos.reviewUserPermissionLevel).toBeCalledWith(
    expect.objectContaining({ username: 'user' })
  )
})

test('checking permission (new syntax)', async () => {
  await robot.receive(events.pr_comment_created_new)
  expect(github.repos.reviewUserPermissionLevel).toBeCalledWith(
    expect.objectContaining({ username: 'user' })
  )
})

test('processing plain issue comments (old syntax)', async () => {
  await robot.receive(events.issue_comment_created_old)
  expect(github.issues.addLabels).not.toBeCalled()
})

test('processing plain issue comments (new syntax)', async () => {
  await robot.receive(events.issue_comment_created_new)
  expect(github.issues.addLabels).not.toBeCalled()
})

test('adding metadata (old syntax)', async () => {
  await robot.receive(events.pr_comment_created_old)
  expect(metadata).toBeCalledWith(
    expect.objectContaining({ payload: expect.any(Object) })
  )
  expect(metadata().set).toBeCalledWith('dependencies', expect.any(Array))
})

test('adding metadata (new syntax)', async () => {
  await robot.receive(events.pr_comment_created_new)
  expect(metadata).toBeCalledWith(
    expect.objectContaining({ payload: expect.any(Object) })
  )
  expect(metadata().set).toBeCalledWith('dependencies', expect.any(Array))
})

test('adding the marker (old syntax)', async () => {
  await robot.receive(events.pr_comment_created_old)
  expect(github.issues.addLabels).toBeCalledWith(
    expect.objectContaining({
      owner: 'user',
      repo: 'test',
      number: 1,
      labels: expect.any(Array)
    })
  )
})

test('adding the marker (new syntax)', async () => {
  await robot.receive(events.pr_comment_created_new)
  expect(github.issues.addLabels).toBeCalledWith(
    expect.objectContaining({
      owner: 'user',
      repo: 'test',
      number: 1,
      labels: expect.any(Array)
    })
  )
})

test('removing the marker', async () => {
  await robot.receive(events.pr_comment_created_remove)
  expect(github.issues.removeLabel).toBeCalled()
  expect(github.issues.addLabels).not.toBeCalled()
})

test('running check after the update', async () => {
  await robot.receive(events.pr_comment_created_old)
  expect(check).toHaveBeenCalledWith(
    expect.any(Object),
    'user',
    'test',
    '123',
    [1, 2]
  )

  await robot.receive(events.pr_comment_created_new)
  expect(check).toHaveBeenLastCalledWith(
    expect.any(Object),
    'user',
    'test',
    '123',
    [1, 2]
  )

  await robot.receive(events.pr_comment_created_remove)
  expect(check).toHaveBeenLastCalledWith(
    expect.any(Object),
    'user',
    'test',
    '123',
    []
  )
})
