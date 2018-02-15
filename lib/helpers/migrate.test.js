jest.mock('probot-metadata')

// Packages
const metadata = require('probot-metadata')

// Ours
const events = require('../events')
const migrate = require('./migrate')

// Constants
let context
const owner = 'user'
const repo = 'test'
const number = 1

// Mock everything
beforeEach(() => {
  // Mock GitHub client
  context = {
    payload: events.pull_request_opened.payload,
    issue: obj => ({ owner, repo, number, ...obj }),
    github: { issues: { edit: jest.fn() } }
  }
})

test('it gets stored metadata', async () => {
  await migrate(context)
  expect(metadata().get).toHaveBeenCalledWith('dependencies')
})

test('it edits the original PR', async () => {
  const body = 'test body\n\nDepends on #1\nDepends on #2\nDepends on #3'
  const output = await migrate(context)
  expect(output).toEqual(body)
  expect(context.github.issues.edit).toHaveBeenCalledWith(
    expect.objectContaining({ body })
  )

  expect(metadata).toHaveBeenLastCalledWith(
    context,
    expect.objectContaining({ repo, number, owner, body })
  )
  expect(metadata().set).toHaveBeenCalledWith('dependencies', [])
})
