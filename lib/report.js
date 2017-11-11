const report = async ({ repos }, owner, repo, sha, state, blockers) => {
  let description = ''
  switch (state) {
    case 'success':
      description = 'All dependencies are resolved'
      break

    case 'failure':
      description = `Blocked by ${blockers.map(i => '#' + i).join()}`
      break

    default:
      description = 'Checking dependencies'
      break
  }

  repos.createStatus({ context: 'dep', description, owner, repo, state, sha })
}

module.exports = report
