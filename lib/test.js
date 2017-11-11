// Packages
const metadata = require('probot-metadata')

// Ours
const check = require('./check')

const test = async context => {
  // Extract necessary objects
  const { github, payload } = context
  const repo = payload.repository.name
  const owner = payload.repository.owner.login
  const { sha } = payload.pull_request.head

  // Get dependencies list
  const deps = (await metadata(context).get('dependencies')) || []

  // Preform checks on this PR
  return check(github, owner, repo, sha, deps)
}

module.exports = test
