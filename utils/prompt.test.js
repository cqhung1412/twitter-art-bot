const { getPrompt } = require("./prompt");

test("getPrompt()", () => {
  const prompt = getPrompt();
  expect(typeof prompt).toBe("string");
  expect(prompt.length > 10).toBeTruthy();
});
