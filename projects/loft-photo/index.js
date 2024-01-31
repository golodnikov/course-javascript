const photos = require('./photos.json');
const friends = require('./friends.json');

console.log(friends);
console.log(photos);
function getRandomElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

const fruits = ['банан', 'яблоко', 'груша', 'ананас'];
console.log(getRandomElement(fruits));

function getNextPhoto() {
  const user = getRandomElement(friends);
  const idxFriends = friends.indexOf(user);
  return {
    name: user.firstName,
    url: getRandomElement(Object.assign(photos)[idxFriends]).url,
  };
}
console.log(getNextPhoto());
