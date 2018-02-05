// Ours
const run = require('./run')
const match = require('./helpers/match')

async function toggle (context) {
  // 1. Extract necessary info
  const issue = context.issue()
  const { payload, github } = context
  const { sha } = payload.pull_request.head

  // 2. Match issue patterns
  const deps = await match(payload.pull_request)

  // 3. Add or remove the label
  if (deps.length > 0) {
    // Add the label
    await github.issues.addLabels({ ...issue, labels: ['dependent'] })
  } else {
    // Remove it
    await github.issues.removeLabel({ ...issue, name: 'dependent' })
  }

  // 4. Run checks anyway
  return run(github, issue, sha, deps)
}

module.exports = toggle
