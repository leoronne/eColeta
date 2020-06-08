import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearchLocation } from 'react-icons/fa';

import NavItem from './NavItem';
import DropdownMenu from './DropdownMenu';
import CreatePoint from '../CreatePoint';

import { ReactComponent as CaretIcon } from '~/assets/icons/caret.svg';
import { ReactComponent as HomeIcon } from '~/assets/icons/home.svg';

import './styles.css';

interface HeaderProps {
  title: string;
  logo: string;
  homelink: string;
}

const Header: React.FC<HeaderProps> = (props) => {
  const currentUrl = String(window.location.href.split(window.location.origin).pop()).split('#').shift();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <nav className="navbar">
        <ul className="navbar-start">
          <li className="navbar-logo">
            <Link to={props.homelink} className="nav-logo">
              <img src={props.logo} alt={props.title} className="logo" />
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav">
          {currentUrl === '/' ? (
            <NavItem icon={<FaSearchLocation />} alt="Home" path="/feed" dropdown={false} />
          ) : (
            <NavItem icon={<HomeIcon />} alt="Home" path={props.homelink} dropdown={false} />
          )}
          {currentUrl === '/feed' ? <CreatePoint handleShow={handleShow} show={show} handleClose={handleClose} /> : ''}

          <NavItem icon={<CaretIcon />} alt="Menu" dropdown path="#">
            <DropdownMenu />
          </NavItem>
        </ul>
      </nav>
    </>
  );
};

export default Header;
