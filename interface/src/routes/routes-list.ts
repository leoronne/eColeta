import Home from '../pages/Home';
import Feed from '../pages/Feed';
import About from '../pages/About';

const language = localStorage.getItem('defaultLanguage') !== 'pt' ? 'en' : 'pt';

const routes = [
  // DefaultLayout
  {
    component: Home,
    title: language === 'pt' ? 'Página Inicial' : 'Homepage',
    path: '/',
    layout: 'DefaultLayout',
    exact: true,
  },
  {
    component: Feed,
    title: 'Feed',
    path: '/feed',
    layout: 'DefaultLayout',
    exact: false,
  },
  {
    component: About,
    title: language === 'pt' ? 'Sobre' : 'About',
    path: '/about',
    layout: 'DefaultLayout',
    exact: false,
  },
];

export default routes;
