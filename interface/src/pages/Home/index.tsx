import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearchLocation } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

import './styles.css';

const Home: React.FC = () => {
  const { t } = useTranslation('',{ useSuspense: false });
  return (
    <main>
      <h1> {t('maintitle1')} <br/>{t('maintitle2')}</h1>
      <p>{t('subtitle1')} <br/> {t('subntitle2')} </p>
      <Link to="/feed">
        <span>
          <FaSearchLocation />
        </span>
        <strong>{t('feedbutton')}</strong>
      </Link>
    </main>
  );
};

export default Home;
