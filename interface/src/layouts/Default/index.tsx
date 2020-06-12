import React from 'react';
import { Route } from 'react-router-dom';

import Header from '../../components/Header';

import logo from '~/assets/img/Logo-horizontal.png';

import './styles.css';

interface DefaultLayoutProps {
  name: string;
  component: Function;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = (props) => {
  // const http = require("http");
  // setInterval(function() {
  //     http.get(process.env.REACT_APP_API_URL);
  // }, 15000); 
  return (
    <>
      <Header title="eColeta" logo={logo} homelink="/" />
      <div id="page-home">
        <div className="content">
          <Route render={() => <props.component title={props.name} />} />
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
