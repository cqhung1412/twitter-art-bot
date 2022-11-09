const fs = require("fs");
const fetch = require("node-fetch");
const FormData = require("form-data");
const { getPrompt } = require("./prompt");

require("dotenv").config();

const authHeader = {
  Authorization: process.env.HOTPOT_AI_API_KEY,
};

const postImage = async (prompt) => {
  try {
    const form = new FormData();
    form.append("inputText", prompt);
    form.append("styleId", 23);
    const response = await fetch("https://api.hotpot.ai/make-art", {
      method: "POST",
      body: form,
      headers: authHeader
    });
    const imageBuffer = Buffer.from(await response.arrayBuffer());
    return [imageBuffer];
  } catch (error) {
    console.log(error);
  }
};

module.exports = { postImage };
