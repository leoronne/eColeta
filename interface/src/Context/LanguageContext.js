import React, { createContext, useEffect, useState } from 'react';
import i18n from 'i18next';

const Context = createContext();

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(true);

  function LanguageChange(lgn) {
    i18n.changeLanguage(lgn);
    localStorage.setItem('defaultLanguage', lgn);
    setLanguage(lgn);
  }

  useEffect(() => {
    const lgnstrg = localStorage.getItem('defaultLanguage') !== 'pt' ? 'en' : 'pt';
    LanguageChange(lgnstrg);
  }, []);

  return <Context.Provider value={{ language, LanguageChange }}>{children}</Context.Provider>;
}

export { Context, LanguageProvider };
