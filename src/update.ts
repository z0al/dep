// Packages
import { Context } from "probot";

// Ours
import run from "./run";
import match from "./helpers/match";

export default async function update(context: Context) {
	const { github } = context;

	// Extract necessary info
	const repo = context.repo();
	const origin = context.issue();

	// Constants
	const labels = "dependent";
	const state = "open";
	const per_page = 100;

	// Get all open, dependent pull requests
	const issues = await github.paginate(
		github.issues.listForRepo,
		{
			...repo,
			labels,
			state,
			per_page,
		},
		(res) => res.data
	);

	for (const issue of issues) {
		// We only process PRs
		if (!issue.pull_request) continue;

		// Get full PR details
		const { data } = await github.pulls.get({
			...repo,
			pull_number: issue.number,
		});

		// Get dependencies list
		const deps = await match({
			body: data.body,
			pull_number: data.number,
		});

		// Re-check if the original issue is a dependency of this PR
		if (deps.includes(origin.issue_number)) {
			await run(github, repo, data.head.sha, deps);
		}
	}
}
