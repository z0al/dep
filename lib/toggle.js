// Ours
const run = require('./run')
const match = require('./helpers/match')
const migrate = require('./helpers/migrate')

async function toggle (context) {
  // 1. Extract necessary info
  const issue = context.issue()
  const { payload, github } = context
  const { sha } = payload.pull_request.head

  // 2. Migrate if necessary
  const body = await migrate(context)

  // 3. Match issue patterns
  const deps = await match({ body })

  // 4. Add or remove the label
  if (deps.length > 0) {
    // Add the label
    await github.issues.addLabels({ ...issue, labels: ['dependent'] })
  } else {
    try {
      // Remove it
      await github.issues.removeLabel({ ...issue, name: 'dependent' })
    } catch (err) {
      // The label doesn't exist (#14)
      // It's OK, no action needs to be done
    }
  }

  // 5. Run checks anyway
  return run(github, issue, sha, deps)
}

module.exports = toggle
