import pages from './pages';
import('./styles.css');
import model from './model';

const pageNames = ['login', 'main', 'profile'];

document.addEventListener('click', () => {
  const pageName = model.getRandomElement(pageNames);
  pages.openPage(pageName);
});
