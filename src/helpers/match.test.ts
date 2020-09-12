import match from "./match";

test("matches all dependencies", async () => {
	const deps = await match({
		body: "This depends on #1, DePend on #2, depended upon #3, and depends #4",
	} as any);
	expect(deps).toEqual([1, 2, 3, 4]);
});

test("returns empty array if no matches found", async () => {
	const deps = await match({
		body: "This depends on nothing",
	} as any);
	expect(deps).toEqual([]);
});
