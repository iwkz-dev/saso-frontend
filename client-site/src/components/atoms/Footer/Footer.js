import { Layout } from 'antd';
import React from 'react';

const FooterComponent = () => {
  return (
    <Layout.Footer
      style={{
        backgroundColor: 'rgb(232, 255, 226)',
        textAlign: 'center',
        color: 'rgb(180, 180, 180)',
      }}
    >
      © {new Date().getFullYear()} IWKZ Al-Falah
    </Layout.Footer>
  );
};

export default FooterComponent;
