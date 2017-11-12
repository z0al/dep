// Packages
const metadata = require('probot-metadata')

// Ours
const check = require('./check')

const ensure = async (context, command) => {
  const { github, payload } = context

  // 1. Extract necessary info
  const owner = payload.repository.owner.login
  const repo = payload.repository.name
  const number = payload.issue.number
  const username = payload.comment.user.login

  // 2. Check user permission
  const { permission } = (await github.repos.reviewUserPermissionLevel({
    username,
    owner,
    repo
  })).data

  // Possible values are: admin, write, read, none
  if (!['admin', 'write'].includes(permission)) return

  // 3. We only target PRs
  if (!payload.issue.pull_request) return

  // 4. Match issue numbers
  const issues = (command.arguments.match(/#(\d+)(?=\s*)/g) || []).map(
    i => Number(i.slice(1)) // Removes '#' prefix
  )

  // 5. Set dependencies (override!)
  await metadata(context).set('dependencies', issues)

  // 6. Add or remove the label
  if (issues.length > 0) {
    // Add the label
    await github.issues.addLabels({
      owner,
      repo,
      number,
      labels: ['dependent']
    })
  } else {
    // Remove it
    await github.issues.removeLabel({
      owner,
      repo,
      number,
      name: 'dependent'
    })
  }

  // 7. Run checks right now
  const { data } = await github.pullRequests.get({ owner, repo, number })
  return check(github, owner, repo, data.head.sha, issues)
}

module.exports = ensure
