// Packages
const metadata = require('probot-metadata')

// Ours
const check = require('./check')

const update = async context => {
  const { github, payload } = context

  // Issue or Pull request?
  const self = payload.issue || payload.pull_request

  // Extract necessary info
  const owner = payload.repository.owner.login
  const repo = payload.repository.name

  // Constants
  const labels = 'dependent'
  const state = 'open'
  const per_page = 100

  // Get all open, dependent pull requests
  github.paginate(
    github.issues.getForRepo({ owner, repo, state, labels, per_page }),
    async page => {
      for (const issue of page.data) {
        // We only process PRs
        if (!issue.pull_request) continue

        const { number } = issue

        // Get full PR details
        const pr = (await github.pullRequests.get({ owner, repo, number })).data

        // Get dependencies list
        const deps = (await metadata(context, pr).get('dependencies')) || []

        // Re-check if the original issue is a dependency of this PR
        if (deps.includes(self.number)) {
          await check(github, owner, repo, pr.head.sha, deps)
        }
      }
    }
  )
}

module.exports = update
