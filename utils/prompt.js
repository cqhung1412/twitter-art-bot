const axios = require("axios").default;

const getIdeas = () => {
  return axios
    .post("https://sparkwriter.hotpot.workers.dev/", {
      serviceId: "nftIdea",
      userInput: {
        topic: "",
      },
    })
    .then((response) => response.data);
};

const getPrompt = async () => {
  const ideas = await getIdeas();
  return ideas[3];
};

module.exports = { getPrompt };
