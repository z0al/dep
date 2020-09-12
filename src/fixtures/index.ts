// Exports event JSONs as friendly names

export default {
	issue_comment_created: require("./issue_comment.created.json"),
	issues_reopened: require("./issues.reopened.json"),
	issues_closed: require("./issues.closed.json"),
	pr_comment_created: require("./pr_comment.created.json"),
	pr_comment_created_remove: require("./pr_comment.created-remove.json"),
	pull_request_opened: require("./pull_request.opened.json"),
	pull_request_edited: require("./pull_request.edited.json"),
	pull_request_reopened: require("./pull_request.reopened.json"),
	pull_request_closed: require("./pull_request.closed.json"),
};
