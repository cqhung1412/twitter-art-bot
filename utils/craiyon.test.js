const { getImages } = require("./craiyon");
const { getPrompt } = require("./prompt");

jest.setTimeout(70000);

test("getImages()", async () => {
  const images = await getImages(getPrompt());
  expect(Array.isArray(images)).toBeTruthy();
  expect(images.length <= 4).toBeTruthy();
  images.forEach((image) => expect(image).toEqual(expect.any(Buffer)));
});
