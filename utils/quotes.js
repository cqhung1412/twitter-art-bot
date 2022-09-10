const quotes = function () {
  this.QUOTES = [
    "Princess Jasmine playing a video game and winning in a bustling modern city, Sketch, Hyperrealistic",
    "Snow White playing football and winning in a winery, Sketch",
    "A camera being licked by a sloth in a museum, Baroque painting, Hyperrealistic",
    "A goblin learning to fly in a restaurant, Portrait",
    "Darth Vader learning to fly in an alien spaceship, On the television show The Brady Bunch, Award winning",
    "Cleopatra wearing fancy purple pants holding avocados in a tree, Go pro footage, 4K HD",
    "A cigarette covered in cheese in a beauty salon, Movie Poster",
    "Winnie the Pooh wearing combat boots and a brand new gold t-shirt drinking a mug of beer in a zoo, Book cover",
    "An elf learning to fly in a submarine, Painting by Leonardo Da Vinci",
    "Harry Potter playing with a cigarette and losing in a plain, Painting by Pablo Picasso",
    "Painting of a dachshund drinking water in the style of Van Gogh",
    "Sneakers being licked by a pokemon in a bustling modern city, Movie Poster, Hyperrealistic",
    "A fork being sucked into a blackhole in a zoo, Comic-style art",
    "A boombox covered in solid gold in a prison cell, Cover of GQ magazine",
    "Grapes giving off light in a prison cell, Comic-style art",
    "A jug of milk and squash made out of newspaper in a garden, Cover of GQ magazine, Award winning",
    "A camera covered in cheese in a beach scene, On the television show Baywatch",
    "A gorilla holding a plate of nachos and eating a banana in a submarine, Realistic photograph",
    "Avocados sitting on top of a phone in a medieval castle, Painting by Pablo Picasso",
    "A giant squid holding a plate of nachos in a temple, Victorian Newspaper article",
    "A cigarette giving off light in an academy, Digital art"
  ];
};

const getQuotes = () => {
  const newQuotes = new quotes();
  return newQuotes.QUOTES[Math.floor(Math.random() * newQuotes.QUOTES.length)];
};

module.exports = { getQuotes };
