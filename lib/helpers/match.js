const pattern = /depend(?:s|ed)?(?:[ \t]+(?:up)?on)?[ \t]+#(\d+)/gi

async function match (pull_request, pull_request_number) {
  const { body } = pull_request
  let result = []
  let tmp
  while ((tmp = pattern.exec(body)) !== null) {
    result.push(Number(tmp[1]))
  }

  // Remove all dependencies that refer to the same PR.
  result = result.filter(function (number) {
    return number !== pull_request_number
  })

  return result
}

module.exports = match
