// Ours
import { GithubAPI, Repository, Status } from "./types";

export default async function report(
	{ repos }: GithubAPI,
	repo: Repository,
	sha: string,
	state: Status,
	blockers: number[]
) {
	let description = "";
	switch (state) {
		case "success":
			description = "All dependencies are resolved";
			break;

		case "failure":
			description = `Blocked by ${blockers
				.map((i) => {
					return "#" + i;
				})
				.join()}`;
			break;

		default:
			description = "Checking dependencies";
			break;
	}

	return repos.createCommitStatus({
		context: "DEP",
		description,
		...repo,
		state,
		sha,
	});
}
