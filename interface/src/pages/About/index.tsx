import React from 'react';
import { useTranslation } from 'react-i18next';

import logo from '~/assets/img/logo512.png';

import './styles.css';

interface AboutProps {
  title: string;
}

const About: React.FC<AboutProps> = (props) => {
  document.title = `${props.title} | eColeta`;
  const { t } = useTranslation('', { useSuspense: false });
  return (
    <main className="cardfull">
      <h1>{t('about')}</h1>
      <p className="text--center">
        <img src={logo} alt="eColeta" />
      </p>
      <p>
        {t('abouttext1')}
        <br />
        <br />
        {t('abouttext2')}
      </p>
    </main>
  );
};

export default About;
