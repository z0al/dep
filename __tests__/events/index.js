// Exports event JSONs as friendly names

module.exports = {
  issue_comment_created_old: require('./issue_comment.created-old.json'),
  issue_comment_created_new: require('./issue_comment.created-new.json'),
  issues_reopened: require('./issues.reopened.json'),
  issues_closed: require('./issues.closed.json'),
  pr_comment_created_old: require('./pr_comment.created-old.json'),
  pr_comment_created_new: require('./pr_comment.created-new.json'),
  pr_comment_created_remove: require('./pr_comment.created-remove.json'),
  pull_request_opened: require('./pull_request.opened.json'),
  pull_request_reopened: require('./pull_request.reopened.json'),
  pull_request_closed: require('./pull_request.closed.json'),
  pull_request_synchronize: require('./pull_request.synchronize.json')
}
