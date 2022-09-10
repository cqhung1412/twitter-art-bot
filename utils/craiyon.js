const { Client } = require("craiyon");

const craiyon = new Client();

const getImages = async (prompt) => {
  if (!prompt) return [];
  const result = await craiyon.generate({
    prompt,
  });
  result.images.length = 4; // Tweet must not have more than 4 mediaIds

  let bufferImages = [];
  result.images.forEach((image) => {
    bufferImages.push(image.asBuffer());
  });

  return bufferImages;
};

module.exports = { getImages };
