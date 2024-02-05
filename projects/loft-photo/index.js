import pages from './pages';
import model from './model';
import './styles.css';

const photos = require('./photos.json');
const friends = require('./friends.json');

const pageNames = ['login', 'main', 'profile'];

document.addEventListener('click', () => {
  const pageName = model.getRandomElement(pageNames);
  pages.openPage(pageName);
});
function getRandomElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function getNextPhoto() {
  const user = getRandomElement(friends);
  const idxFriends = friends.indexOf(user);
  return {
    name: user.firstName,
    url: getRandomElement(Object.assign(photos)[idxFriends]).url,
  };
}
getNextPhoto();
