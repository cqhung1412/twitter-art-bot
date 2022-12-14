import constants from '../constants/index.mjs';
const {
  content,
  imageType,
  imageMod,
  food,
  color,
  settings,
  humanoid,
  humanMod,
  critter,
  driveable,
  rideable,
  profession,
  painter,
  magazine,
  show,
  movie,
  holdable,
  objectMod,
  fruit,
  veggie,
  drinkable,
  plantable,
  wearable,
  playable,
  wearableMod,
  footwear,
  material,
} = constants;

function getArrayByParam(param) {
  switch (param) {
    case '#content#':
      return content;
    case '#img-type#':
      return imageType;
    case '#img-mod#':
      return imageMod;
    case '#food#':
      return food;
    case '#color#':
      return color;
    case '#setting#':
      return settings;
    case '#humanoid#':
      return humanoid;
    case '#human-mod#':
      return humanMod;
    case '#critter#':
      return critter;
    case '#driveable#':
      return driveable;
    case '#rideable#':
      return rideable;
    case '#profession#':
      return profession;
    case '#painter#':
      return painter;
    case '#magazine#':
      return magazine;
    case '#show#':
      return show;
    case '#movie#':
      return movie;
    case '#holdable#':
      return holdable;
    case '#obj-mod#':
      return objectMod;
    case '#fruit#':
      return fruit;
    case '#veggie#':
      return veggie;
    case '#drinkable#':
      return drinkable;
    case '#plantable#':
      return plantable;
    case '#wearable#':
      return wearable;
    case '#playable#':
      return playable;
    case '#wearable-mod#': // Usage: ___ hat.
      return wearableMod;
    case '#footwear#':
      return footwear;
    case '#material#': // Usage: made out of ___; covered in ___;
      return material;
  }
}

function getRandomFromArray(arr) {
  const item = arr[Math.floor(Math.random() * arr.length)];
  return item;
}

function resolve(template) {
  let ret = template;
  const arr = template.match(/(#[a-z-]*#)/gi); // arr is an array of all params in the template.
  for (const item in arr) {
    const options = getArrayByParam(arr[item]);
    const input = resolve(getRandomFromArray(options)); // Recursive call to resolve embedded templates.
    // replace the param in the template.
    ret = ret.replace(arr[item], input);
  }
  return ret;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getPrompt() {
  let promptContent = '#content#';
  if (Math.random() < 0.5) promptContent += ', #img-type##img-mod#';
  return capitalizeFirstLetter(resolve(promptContent));
}

export default {getPrompt};
