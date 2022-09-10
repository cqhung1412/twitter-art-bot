require("dotenv").config();
const { TwitterApi } = require("twitter-api-v2");
const { getImages } = require("./craiyon");
const { getQuotes } = require("./quotes");

const {
  TWITTER_API_KEY,
  TWITTER_API_SECRET,
  TWITTER_ACCESS_TOKEN,
  TWITTER_ACCESS_TOKEN_SECRET,
} = process.env;

// Twit client init
const client = new TwitterApi({
  appKey: TWITTER_API_KEY,
  appSecret: TWITTER_API_SECRET,
  accessToken: TWITTER_ACCESS_TOKEN,
  accessSecret: TWITTER_ACCESS_TOKEN_SECRET,
});

const postArt = async () => {
  const prompt = getQuotes();
  console.info("Got prompt:", prompt)

  const images = await getImages(prompt);
  console.log(`Got ${images.length} images`)
  const promises = [];
  images.forEach((image) => {
    promises.push(
      client.v1.uploadMedia(image)
    );
  });
  const mediaIds = await Promise.all(promises);
  return client.v1
    .tweet(prompt, { media_ids: mediaIds })
    .then(() => {
      console.log("Tweet successfully.", prompt);
    })
    .catch((err) => {
      console.log("Tweet failed.", err.response?.data || err.response || err);
    });
};

module.exports = { postArt };
