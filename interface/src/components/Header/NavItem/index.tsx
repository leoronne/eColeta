import React, { useState, useEffect, Component, ComponentElement, ReactComponentElement } from 'react';
import { Link } from 'react-router-dom';

interface NavItemProps {
  path: string;
  alt: string;
  dropdown: boolean;
  icon: any;
}

const NavItem: React.FC<NavItemProps> = (props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
  document.addEventListener('click', (e) => {
    let node = e.target as HTMLElement | null;
    let inside = false;
    while (node) {
      if (node.classList.contains('nav-item') || node.classList.contains('dropdown') || node.classList.contains('menu-item')) {
        inside = true;
        break;
      }
      node = node.parentElement;
    }
    if (!inside) {
      setOpen(false);
    }
  });
  }, []);

  return (
    <li className="nav-item">
      <Link
        to={props.dropdown ? '#' : props.path}
        className={`icon-button${open ? ' icon-button-color' : ''}`}
        onClick={() => (props.dropdown ? setOpen(!open) : '')}
      >
        {props.icon}
      </Link>
      {open && props.children}
    </li>
  );
};

export default NavItem;
