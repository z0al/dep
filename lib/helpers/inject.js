/**
 * Clone necesssary context attributes and inject given issue data into the
 * payload.
 *
 * @param {*} context
 * @param {*} data
 */
function inject (context, data) {
  const { owner, repo, number } = context.issue()
  const { id } = context.payload.installation

  return {
    github: context.github,
    payload: { installation: { id }, issue: data, pull_request: data },
    issue: (obj = {}) => {
      return { owner, repo, number, ...obj }
    },
    repo: (obj = {}) => {
      return { owner, repo, ...obj }
    }
  }
}

module.exports = inject
