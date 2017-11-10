const report = async (github, pr, state, blockers) => {
  const { sha, repo } = pr.head

  let description = ''
  switch (state) {
    case 'success':
      description = 'Ready to be merged'
      break

    case 'failure':
      description = `Blocked by ${blockers.map(i => '#' + i).join()}`
      break

    default:
      description = 'Checking dependency states'
      break
  }

  github.repos.createStatus({
    owner: repo.owner.login,
    repo: repo.name,
    context: 'dep',
    description,
    state,
    sha
  })
}

module.exports = report
