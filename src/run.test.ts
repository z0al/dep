jest.mock("./report");

// Ours
import run from "./run";
import report from "./report";
import { GithubAPI, Repository } from "./types";

// Globals
let github: GithubAPI, repo: Repository, sha: string, deps: number[];

beforeEach(() => {
	// Mock GitHub client
	github = {
		issues: {
			get: jest
				.fn()
				.mockReturnValueOnce({ data: { state: "closed" } })
				.mockReturnValue({ data: { state: "open" } }),
		},
		repos: { createCommitStatus: jest.fn() },
	} as any;

	repo = {
		owner: "test",
		repo: "test",
	};

	sha = "123";
	deps = [1, 2, 3];
});

test("getting issue states", async () => {
	await run(github, repo, sha, deps);

	expect(github.issues.get).toHaveBeenCalledWith(
		expect.objectContaining({ issue_number: expect.any(Number) })
	);
	expect(github.issues.get).toHaveBeenCalledTimes(3);
});

test("reporting", async () => {
	await run(github, repo, sha, deps);

	expect(report).toHaveBeenLastCalledWith(github, repo, sha, "failure", [2, 3]);
});
