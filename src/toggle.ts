// Packages
import { Context } from "probot";

// Ours
import run from "./run";
import match from "./helpers/match";

export default async function toggle(context: Context) {
	const { payload, github, log } = context;
	const { head, body } = payload.pull_request;

	const issue = context.issue({ body });

	// Match issue patterns
	const deps = await match({
		...issue,
		pull_number: issue.issue_number,
	});

	// Add or remove the label
	if (deps.length > 0) {
		// Add the label
		log("Adding label");
		await github.issues.addLabels({ ...issue, labels: ["dependent"] });
	} else {
		try {
			// Remove it
			log("No dependencies found, removing the label");
			await github.issues.removeLabel({ ...issue, name: "dependent" });
		} catch (err) {
			// Nothing need to be done. Resolves (#14)
			log("The label doesn't exist. It's OK!");
		}
	}

	// Run checks anyway
	log("Running checks");
	await run(github, issue, head.sha, deps);
}
