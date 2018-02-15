const pattern = /depend(?:s|ed)?(?:[ \t]+(?:up)?on)?[ \t]+#(\d+)/gi

async function match (pull_request) {
  const { body } = pull_request
  const result = []
  let tmp
  while ((tmp = pattern.exec(body)) !== null) {
    result.push(Number(tmp[1]))
  }

  return result
}

module.exports = match
