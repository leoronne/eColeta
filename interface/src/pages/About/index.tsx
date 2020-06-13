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
        eColeta is a Web and Mobile application built to help people find collection points for waste recycling. It's a project part of the Rocketseat's #1 Next Level Week.
        <br />
        <br />
        The idea of ​​creating an application focused on the environment came from the coincidence of the course date and the date of the 2020's Environment Week.
      </p>
    </main>
  );
};

export default About;
