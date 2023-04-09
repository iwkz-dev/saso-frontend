import React from 'react';
import { Layout, Typography } from 'antd';
import MainCarousel from '../../molecules/MainCarousel/MainCarousel';
import TabsComponent from '../../molecules/TabsComponent/Tabs';

const TokoContent = ({ event }) => {
  const { Content } = Layout;

  return (
    <Content
      style={{
        minHeight: '500px',
        backgroundColor: '#ffffff',
      }}
    >
      <MainCarousel eventName={event.name} images={event.images} />
      <div style={{ maxWidth: '1024px', padding: '1rem', margin: '1rem auto' }}>
        <Typography>
          <Typography.Title level={2} style={{ textAlign: 'center' }}>
            Products
          </Typography.Title>
        </Typography>
        <TabsComponent event={event} />
      </div>
    </Content>
  );
};

export default TokoContent;
