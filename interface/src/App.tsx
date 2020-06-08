import React from 'react';

import { ToastContainer } from 'react-toastify';

import { LanguageProvider } from './Context/LanguageContext';

import '~/assets/styles/ReactToastify.css';
import '~/assets/styles/global.css';
import '~/assets/styles/modal.css';
// import '~/assets/styles/modal.css';

import Routes from './routes';

function App() {
  return (
    <>
      <ToastContainer />
      <LanguageProvider>
        <Routes />
      </LanguageProvider>
    </>
  );
}

export default App;
