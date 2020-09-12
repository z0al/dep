jest.mock("./run");

// Packages
import nock from "nock";
import { Probot, ProbotOctokit } from "probot";

// Ours
import toggle from "./toggle";
import events from "./fixtures";

// Globals
let robot: Probot;

// Mock everything
beforeEach(() => {
	robot = new Probot({
		githubToken: "test",
		Octokit: ProbotOctokit.defaults({
			retry: { enabled: false },
			throttle: { enabled: false },
		}),
	});

	robot.load((app) => {
		app.on("pull_request.opened", toggle);
		app.on("pull_request.edited", toggle);
	});

	nock.disableNetConnect();
});

afterAll(() => {
	nock.cleanAll();
});

test("add the label if there are some dependencies", async () => {
	// github.issues.addLabels()
	nock("https://api.github.com")
		.post("/repos/user/test/issues/1/labels", (body) => {
			expect(body).toEqual(["dependent"]);
			return true;
		})
		.reply(200, {});

	await robot.receive(events.pull_request_edited);
});

test("remove the label if there are no dependencies", async () => {
	// github.issues.removeLabel()
	nock("https://api.github.com")
		.post("/repos/user/test/issues/1/labels", (body) => {
			expect(body).toEqual([]);
			return true;
		})
		.reply(200, {});

	await robot.receive(events.pull_request_opened);
});
