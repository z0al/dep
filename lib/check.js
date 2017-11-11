// Packages
const metadata = require('probot-metadata')

// Ours
const report = require('./report')

const check = async (github, owner, repo, sha, deps) => {
  // Tell GitHub we are working on it
  await report(github, owner, repo, sha, 'pending')

  // Helpers
  let pass = true
  let blockers = []

  for (const number of deps) {
    // Get issue details
    const issue = await github.issues.get({ owner, repo, number })

    // The actual test
    if (issue.data.state === 'open') {
      pass = false
      blockers.push(number)
    }
  }

  // Update the state
  report(github, owner, repo, sha, pass ? 'success' : 'failure', blockers)
}

module.exports = check
