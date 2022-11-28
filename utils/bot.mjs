import twitter from 'twitter-api-v2';
import prompt from './prompt.mjs';
import stability from './stability.mjs';
import dotenv from 'dotenv';

const {TwitterApi} = twitter;
const {getPrompt} = prompt;
const {generateImage} = stability;
dotenv.config();

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
  const prompt = getPrompt();
  console.info('Got prompt:', prompt);

  generateImage(prompt, async ({bufferImage}) => {
    const promises = [];
    promises.push(client.v1.uploadMedia(bufferImage, {mimeType: 'image/png'}));
    const mediaIds = await Promise.all(promises);
    return client.v1
      .tweet(
        `${prompt} #stability.ai #stablediffusion #artwork #aiart #texttoimage`,
        {media_ids: mediaIds}
      )
      .then(() => {
        console.log('Tweet successfully:', prompt);
      });
  });
};

export default {postArt};
