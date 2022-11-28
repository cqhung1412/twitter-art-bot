import {writeFileSync} from 'fs';
import fetch from 'node-fetch';
import FormData from 'form-data';

import dotenv from 'dotenv';
dotenv.config();

const authHeader = {
  Authorization: process.env.HOTPOT_AI_API_KEY,
};

const postImage = async prompt => {
  try {
    const form = new FormData();
    form.append('inputText', prompt);
    form.append('styleId', 23);
    const response = await fetch('https://api.hotpot.ai/make-art', {
      method: 'POST',
      body: form,
      headers: authHeader,
    });
    const imageBuffer = Buffer.from(await response.arrayBuffer(), 'base64');
    writeFileSync('test.png', Buffer.concat([imageBuffer]), 'binary');
    return [imageBuffer];
  } catch (error) {
    console.log(error);
  }
};

export default {postImage};
