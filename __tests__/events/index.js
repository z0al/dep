// Exports event JSONs as friendly names

module.exports = {
  issue_comment_created: require('./issue_comment.created.json'),
  pr_comment_created: require('./pr_comment.created.json'),
  pr_comment_created_remove: require('./pr_comment.created-remove.json'),
  pull_request_opened: require('./pull_request.opened.json'),
  pull_request_reopened: require('./pull_request.reopened.json'),
  pull_request_synchronize: require('./pull_request.synchronize.json')
}
