// Packages
const metadata = require('probot-metadata')

const ensure = async (context, command) => {
  // 1. We only target PRs
  if (!context.payload.issue.pull_request) return

  // 2. Match issue numbers
  const issues = (command.arguments.match(/#(\d+)(?=\s*)/g) || []).map(
    i => i.slice(1) // Removes '#' prefix
  )

  // 3. Set dependencies (override!)
  await metadata(context).set('dependencies', issues)

  // 4. Extract necessary info
  const info = {
    owner: context.payload.repository.owner.login,
    repo: context.payload.repository.name,
    number: context.payload.issue.number
  }

  // 5. Add or remove marker
  return issues.length > 0
    ? context.github.issues.addLabels({ ...info, labels: ['dependent'] })
    : context.github.issues.removeLabel({ ...info, name: 'dependent' })
}

module.exports = ensure
