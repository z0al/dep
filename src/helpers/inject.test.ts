import inject from "./inject";

test("injection", () => {
	const context: any = {
		issue: () => ({ owner: "user", issue_number: 1, repo: "test" }),
		payload: {
			issue: { value: "old issue" },
			pull_request: { value: "old pr" },
			installation: { id: 123 },
		},
		github: { something: () => {} },
	};

	const data = { value: "new" };
	const ctx = inject(context, data);

	expect(ctx.payload).not.toEqual(context.payload);
	expect(ctx.payload.issue).toEqual(ctx.payload.pull_request);
	expect(ctx.github).toBe(context.github);
	expect(ctx.payload.installation).toEqual(context.payload.installation);
});
