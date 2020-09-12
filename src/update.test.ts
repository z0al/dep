jest.mock("./report");

// Packages
import nock from "nock";
import { Probot, ProbotOctokit } from "probot";

// Ours
import update from "./update";
import events from "./fixtures";

let robot: Probot;

// Mock everything
beforeEach(() => {
	// Here we create a robot instance
	robot = new Probot({
		githubToken: "test",
		Octokit: ProbotOctokit.defaults({
			retry: { enabled: false },
			throttle: { enabled: false },
		}),
	});

	robot.load((app) => {
		app.on("issues.closed", update);
		app.on("issues.reopened", update);
		app.on("pull_request.reopened", update);
		app.on("pull_request.closed", update);
		app.on("pull_request.synchronize", update);
	});

	const sha = "123";

	nock.disableNetConnect();

	// github.issues.listForRepo
	nock("https://api.github.com")
		.get(/issues$/)
		.query({
			labels: "dependent",
			state: "open",
			per_page: 100,
		})
		.reply(200, [{ number: 11, pull_request: {} }]);

	// github.issues.get
	nock("https://api.github.com")
		.get("/repos/user/test/issues/1")
		.reply(200, (url) => {
			if (url.endsWith("1")) {
				return { state: "closed" };
			}

			return { state: "open" };
		});

	nock("https://api.github.com")
		.get("/repos/user/test/issues/2")
		.reply(200, (url) => {
			if (url.endsWith("1")) {
				return { state: "closed" };
			}

			return { state: "open" };
		});

	nock("https://api.github.com")
		.get("/repos/user/test/issues/3")
		.reply(200, (url) => {
			if (url.endsWith("1")) {
				return { state: "closed" };
			}

			return { state: "open" };
		});

	// github.pulls.get
	nock("https://api.github.com").get(/pulls/).reply(200, {
		body: "depends on #1, depends on #2, depends on #3",
		head: { sha },
	});

	// github.repos.createCommitStatus
	nock("https://api.github.com")
		.post(`/repos/user/test/statuses/${sha}`, () => true)
		.reply(200);
});

test("re-checking the status", async () => {
	await robot.receive(events.issues_closed);
});
