import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../Navbar/';
import BigLogo from '../BigLogo';

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <BigLogo />
      <div>{children}</div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.element,
}

export default Layout