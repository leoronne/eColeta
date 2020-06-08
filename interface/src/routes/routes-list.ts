import Home from '../pages/Home';
import Feed from '../pages/Feed';

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
];

export default routes;
