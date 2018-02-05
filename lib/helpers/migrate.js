// Packages
const metadata = require('probot-metadata')

async function migrate (context) {
  // 1. Extracts necessary info
  let { number, body } = context.payload.pull_request
  const { owner, repo } = context.repo()

  // 2. Get the list of dependencies
  const deps = (await metadata(context).get('dependencies')) || []

  // 3. Migrate if any
  if (deps.length > 0) {
    // Add issues to original PR description
    body += '\n\n' + deps.map(i => 'Depends on #' + i).join('\n')

    await context.github.issues.edit({ owner, repo, number, body })

    // Clear metadata.
    await metadata(context, { owner, repo, number }).set('dependencies', [])
  }
  return body
}

module.exports = migrate
