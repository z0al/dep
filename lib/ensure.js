const ensure = async ({ payload, github }, command) => {
  // 1. We only target PRs
  if (!payload.issue.pull_request) return

  // 2. Match issue numbers
  let labels = command.arguments.match(/#(\d+)(?=\s*)/g)

  // 3. Remove '#' and add label name
  labels = labels.map(i => `needs[${i.slice(1)}]`)

  // 4. Get required details
  const { owner, name } = payload.repository
  const { number } = payload.issue

  // 5. Add new labels
  return github.issues.addLabels({
    owner: owner.login,
    repo: name,
    number,
    labels
  })
}

module.exports = ensure
