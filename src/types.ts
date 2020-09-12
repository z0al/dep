// Packages
import { Context } from "probot";

export type GithubAPI = Context["github"];
export type Repository = ReturnType<Context["repo"]>;
export type Issue = ReturnType<Context["issue"]>;
export type PullRequest = ReturnType<Context["pullRequest"]> & {
	body?: string;
};

export type Status = "error" | "success" | "failure" | "pending";
