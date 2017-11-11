module.exports = jest.fn().mockReturnValue({
  get: jest.fn().mockReturnValue([1, 2, 3]),
  set: jest.fn()
})
