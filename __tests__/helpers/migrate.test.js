jest.mock('probot-metadata')

// Packages
const metadata = require('probot-metadata')

// Ours
const events = require('../events')
const migrate = require('../../lib/helpers/migrate')

// Constants
let context
const owner = 'user'
const repo = 'test'
const number = 1

// Mock everything
beforeEach(() => {
  // Mock GitHub client
  context = {
    payload: events.pull_request_synchronize.payload,
    repo: () => ({ owner, repo }),
    github: { issues: { edit: jest.fn() } }
  }
})

test('it gets stored metadata', async () => {
  await migrate(context)
  expect(metadata().get).toHaveBeenCalledWith('dependencies')
})

test('it edits the original PR', async () => {
  await migrate(context)
  expect(context.github.issues.edit).toHaveBeenCalledWith(
    expect.objectContaining({
      body: 'test body\n\nDepends on #1\nDepends on #2\nDepends on #3'
    })
  )

  expect(metadata).toHaveBeenLastCalledWith(context, { owner, repo, number })
  expect(metadata().set).toHaveBeenCalledWith('dependencies', [])
})
