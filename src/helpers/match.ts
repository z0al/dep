// Packages
import { PullRequest } from "../types";

const pattern = /depend(?:s|ed)?(?:[ \t]+(?:up)?on)?[ \t]+#(\d+)/gi;

export default async function match(pull_request: Partial<PullRequest>) {
	const { body = "", pull_number } = pull_request;
	let result = [];
	let tmp;

	while ((tmp = pattern.exec(body)) !== null) {
		result.push(Number(tmp[1]));
	}

	// Remove all dependencies that refer to the same PR (#7)
	result = result.filter((dep) => {
		return dep !== pull_number;
	});

	return result;
}
