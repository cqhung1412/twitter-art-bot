const { Client } = require("craiyon");

const craiyon = new Client();

const getImages = async (prompt) => {
  if (!prompt) return [];
  const result = await craiyon.generate({
    prompt,
  });
  let base64Images = [];
  result.images.forEach((image) => {
    base64Images.push(image.asBase64());
  });

  return base64Images;
};

module.exports = { getImages };
