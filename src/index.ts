// Native
import { join } from "path";

// Packages
import { Application } from "probot";

// Ours
import toggle from "./toggle";
import update from "./update";

export = (app: Application) => {
	// Toggle label
	app.on("pull_request.opened", toggle);
	app.on("pull_request.edited", toggle);

	// Re-check on dependency updates
	app.on("issues.closed", update);
	app.on("issues.reopened", update);
	app.on("pull_request.reopened", update);
	app.on("pull_request.closed", update);
	app.on("pull_request.synchronize", update);

	// Index page
	app.route("/").get("/", (_, res) => {
		res.sendFile(join(__dirname, "..", "index.html"));
	});
};
