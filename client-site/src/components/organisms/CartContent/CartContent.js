import React from 'react';
import { Layout } from 'antd';

const CartContent = () => {
  const { Content } = Layout;
  return (
    <Content
      style={{
        minHeight: '500px',
        backgroundColor: '#ffffff',
      }}
    >
      Test my Order
    </Content>
  );
};

export default CartContent;
