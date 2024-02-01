const photos = require('./photos.json');
const friends = require('./friends.json');

function getRandomElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

const fruits = ['банан', 'яблоко', 'груша', 'ананас'];
getRandomElement(fruits);

function getNextPhoto() {
  const user = getRandomElement(friends);
  const idxFriends = friends.indexOf(user);
  return {
    name: user.firstName,
    url: getRandomElement(Object.assign(photos)[idxFriends]).url,
  };
}
getNextPhoto();
