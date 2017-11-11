jest.mock('../lib/report')
// Ours
const check = require('../lib/check')
const report = require('../lib/report')

// Globals
let github, owner, repo, sha, deps

// Mock everything
beforeEach(() => {
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

  // Params
  owner = 'user'
  repo = 'test'
  sha = '123'
  deps = [1, 2, 3]
})

test('getting issue states', async () => {
  await check(github, owner, repo, sha, deps)

  expect(github.issues.get).toHaveBeenCalledWith(
    expect.objectContaining({ number: expect.any(Number) })
  )
  expect(github.issues.get).toHaveBeenCalledTimes(3)
})

test('reporting', async () => {
  await check(github, owner, repo, sha, deps)

  expect(report).toHaveBeenLastCalledWith(
    expect.any(Object),
    expect.any(String),
    expect.any(String),
    expect.any(String),
    'failure',
    [2, 3]
  )
})
