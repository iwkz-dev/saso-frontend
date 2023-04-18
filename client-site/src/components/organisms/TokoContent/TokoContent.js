import React from 'react';
import { Layout, Typography } from 'antd';
import TabsComponent from '../../molecules/TabsComponent/Tabs';
import ContentLayout from '../ContentLayout/ContentLayout';

const TokoContent = ({ event }) => {
  const { Content } = Layout;

  return (
    <ContentLayout hasCarousel>
      <Typography>
        <Typography.Title level={2} style={{ textAlign: 'center' }}>
          Products
        </Typography.Title>
      </Typography>
      <TabsComponent event={event} />
    </ContentLayout>
  );
};

export default TokoContent;
