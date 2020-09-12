// Packages
import { Context } from "probot";

/**
 * Clone necesssary context attributes and inject given issue data into the
 * payload.
 */
export default function inject(context: Context, data: unknown) {
	const { owner, repo, issue_number } = context.issue();
	const { id } = context.payload.installation;

	return {
		github: context.github,
		payload: { installation: { id }, issue: data, pull_request: data },
		issue: (obj = {}) => {
			return { owner, repo, issue_number, ...obj };
		},
		repo: (obj = {}) => {
			return { owner, repo, ...obj };
		},
	};
}
