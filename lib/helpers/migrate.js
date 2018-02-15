// Packages
const metadata = require('probot-metadata')

async function migrate (context) {
  // 1. Extracts necessary info
  const { body } = context.payload.pull_request
  const issue = context.issue({ body })

  // 2. Get the list of dependencies
  const deps = (await metadata(context, issue).get('dependencies')) || []

  // 3. Migrate if any
  if (deps.length > 0) {
    // Add issues to original PR description
    issue.body += '\n\n' + deps.map(i => 'Depends on #' + i).join('\n')

    await context.github.issues.edit(issue)

    // Clear metadata.
    await metadata(context, issue).set('dependencies', [])
  }
  return issue.body
}

module.exports = migrate
