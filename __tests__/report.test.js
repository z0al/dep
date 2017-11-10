// Ours
const report = require('../lib/report')

// Globals
let github, pr, params

beforeEach(() => {
  github = {
    repos: {
      createStatus: jest.fn()
    }
  }
  pr = {
    head: { sha: '123', repo: { name: 'test', owner: { login: 'user' } } }
  }
})

test('sending success status', async () => {
  await report(github, pr, 'success')

  expect(github.repos.createStatus).toBeCalledWith(
    expect.objectContaining({
      sha: '123',
      state: 'success',
      description: expect.stringMatching(/Ready/)
    })
  )
})

test('sending failure status', async () => {
  await report(github, pr, 'failure', [1, 2, 3])

  expect(github.repos.createStatus).toBeCalledWith(
    expect.objectContaining({
      sha: '123',
      state: 'failure',
      description: expect.stringMatching(/Blocked by (#\d+,?)+/)
    })
  )
})

test('sending pending status', async () => {
  await report(github, pr, 'pending')

  expect(github.repos.createStatus).toBeCalledWith(
    expect.objectContaining({
      sha: '123',
      state: 'pending',
      description: expect.stringMatching(/Checking/)
    })
  )
})
