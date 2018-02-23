// Ours
const run = require('./run')
const match = require('./helpers/match')
const migrate = require('./helpers/migrate')

async function toggle (context) {
  // 1. Extract necessary info
  const issue = context.issue()
  const { payload, github, log } = context
  const { sha } = payload.pull_request.head

  // 2. Migrate if necessary
  const body = await migrate(context)
  const self_pr_num = payload.number
  // 3. Match issue patterns
  let deps = await match({ body }, self_pr_num)

  // 5. Add or remove the label
  if (deps.length > 0) {
    // Add the label
    log('Adding label')
    await github.issues.addLabels({ ...issue, labels: ['dependent'] })
  } else {
    try {
      // Remove it
      log('No dependencies found, removing the label')
      await github.issues.removeLabel({ ...issue, name: 'dependent' })
    } catch (err) {
      // Nothing need to be done. Resolves (#14)
      log("The label doesn't exist. It's OK!")
    }
  }

  // 6. Run checks anyway
  log('Running checks')
  return run(github, issue, sha, deps)
}

module.exports = toggle
