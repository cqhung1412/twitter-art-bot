const { Client } = require("craiyon");

const craiyon = new Client();

const getImages = async (prompt) => {
  if (!prompt) return [];
  const result = await craiyon.generate({
    prompt,
  });
  
  let bufferImages = [];
  result.images.forEach((image) => {
    bufferImages.push(image.asBuffer());
  });

  return bufferImages;
};

module.exports = { getImages };
