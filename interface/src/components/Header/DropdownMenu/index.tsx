/* eslint-disable no-shadow */
import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { useTranslation } from 'react-i18next';
import { FaArrowLeft } from 'react-icons/fa';

// import ThemeToggle from './ThemeToggle';

import Contact from '../../Contact';
import { Context } from '../../../Context/LanguageContext';

import { ReactComponent as ChevronIcon } from '~/assets/icons/chevron.svg';
import { ReactComponent as BrazilIcon } from '~/assets/icons/brazil.svg';
import { ReactComponent as USAIcon } from '~/assets/icons/usa.svg';
import { ReactComponent as AboutIcon } from '~/assets/icons/about.svg';
import { ReactComponent as QuestionIcon } from '~/assets/icons/question.svg';

const DropdownMenu: React.FC = (props) => {
  const { language, LanguageChange } = useContext(Context);
  const { t } = useTranslation();
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(0);
  const dropdownRef = useRef(null);
  // const currentUrl = String(window.location.href.split(window.location.origin).pop()).split('#').shift();

  useEffect(() => {
    // const w = window.innerWidth;
    setMenuHeight(
      //     w > 500 ?
      145
      //     : 255
    );
  }, []);

  function calcHeight(el: { offsetHeight: number }) {
    const height = el.offsetHeight + (activeMenu === 'main' ? 0 : 35);
    setMenuHeight(height);
  }

  function DropdownItem(props: {
    path: string | undefined;
    goToMenu: React.SetStateAction<string>;
    leftIcon: React.ReactNode;
    children: React.ReactNode;
    rightIcon: React.ReactNode | undefined;
  }) {
    return (
      <a href={props.path} className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  function DropdownLink(props: { path: string; goToMenu: any | undefined; leftIcon: React.ReactNode; children: React.ReactNode; rightIcon: React.ReactNode | undefined }) {
    return (
      <Link to={props.path} className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </Link>
    );
  }

  function DropdownLanguageItem(props: {
    language: string;
    function: ((event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void) | undefined;
    leftIcon: React.ReactNode;
    children: React.ReactNode;
    rightIcon: React.ReactNode | undefined;
  }) {
    return (
      <span className={`menu-item${language === props.language ? ' drop-active' : ''}`} onClick={props.function}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </span>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition in={activeMenu === 'main'} timeout={200} classNames="menu-primary" unmountOnExit onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem leftIcon={<QuestionIcon />} rightIcon={<ChevronIcon />} goToMenu="support" path="#">
            {t('help')}
          </DropdownItem>
          <DropdownItem leftIcon={language !== 'pt' ? <USAIcon /> : <BrazilIcon />} rightIcon={<ChevronIcon />} goToMenu="language" path="#">
            {t('language')}
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition in={activeMenu === 'support'} timeout={200} classNames="menu-secondary" unmountOnExit onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<FaArrowLeft />} path="#" rightIcon="">
            <h2> {t('help')}</h2>
          </DropdownItem>
          <Contact />
          <DropdownLink leftIcon={<AboutIcon />} path="/about" rightIcon="" goToMenu={undefined}>
            {t('about')}
          </DropdownLink>
        </div>
      </CSSTransition>

      <CSSTransition in={activeMenu === 'language'} timeout={200} classNames="menu-secondary" unmountOnExit onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<FaArrowLeft />} rightIcon="" path="#">
            <h2> {t('language')}</h2>
          </DropdownItem>
          <DropdownLanguageItem leftIcon={<BrazilIcon />} language="pt" function={() => LanguageChange('pt')} rightIcon="">
            {t('pt')}
          </DropdownLanguageItem>
          <DropdownLanguageItem leftIcon={<USAIcon />} language="en" function={() => LanguageChange('en')} rightIcon="">
            {t('en')}
          </DropdownLanguageItem>
        </div>
      </CSSTransition>
    </div>
  );
};

export default DropdownMenu;
