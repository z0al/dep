const pattern = /depend(?:s|ed)?(?:[ \t]+(?:up)?on)?[ \t]+#(\d+)/gi

async function match (pull_request) {
  const { body, number } = pull_request
  let result = []
  let tmp

  while ((tmp = pattern.exec(body)) !== null) {
    result.push(Number(tmp[1]))
  }

  // Remove all dependencies that refer to the same PR (#7)
  result = result.filter(dep => {
    return dep !== number
  })

  return result
}

module.exports = match
