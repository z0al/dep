// Ours
const report = require('../lib/report')

// Globals
let github, owner, repo, sha

beforeEach(() => {
  github = {
    repos: {
      createStatus: jest.fn()
    }
  }
  owner = 'user'
  repo = 'test'
  sha = '123'
})

test('sending success status', async () => {
  await report(github, owner, repo, sha, 'success')

  expect(github.repos.createStatus).toBeCalledWith(
    expect.objectContaining({
      sha: '123',
      state: 'success',
      description: expect.stringMatching(/resolved/)
    })
  )
})

test('sending failure status', async () => {
  await report(github, owner, repo, sha, 'failure', [1, 2, 3])

  expect(github.repos.createStatus).toBeCalledWith(
    expect.objectContaining({
      sha: '123',
      state: 'failure',
      description: expect.stringMatching(/Blocked by (#\d+,?)+/)
    })
  )
})

test('sending pending status', async () => {
  await report(github, owner, repo, sha, 'pending')

  expect(github.repos.createStatus).toBeCalledWith(
    expect.objectContaining({
      sha: '123',
      state: 'pending',
      description: expect.stringMatching(/Checking/)
    })
  )
})
