import pages from './pages';
import './styles.css';
import loginPage from './LoginPage';

const pageNames = ['login', 'main', 'profile'];

const pageName = pageNames[0];
pages.openPage(pageName);
loginPage.handleEvents();
