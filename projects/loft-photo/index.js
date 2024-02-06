import pages from './pages';
import './styles.css';
import loginPage from './LoginPage';

const photos = require('./photos.json');
const friends = require('./friends.json');

// const pageNames = ['login', 'main', 'profile'];

const pageName = 'login';
pages.openPage(pageName);
loginPage.handleEvents();
function getRandomElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function getNextPhoto() {
  const user = getRandomElement(friends);
  const idxFriends = friends.indexOf(user);
  return {
    name: user.first_name,
    url: getRandomElement(Object.assign(photos)[idxFriends]).url,
  };
}
getNextPhoto();
