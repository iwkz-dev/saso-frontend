import { Button, Space, Steps } from 'antd';
import { Layout } from 'antd';
import Router from 'next/router';
import { LeftOutlined } from '@ant-design/icons';

const CheckoutContent = () => {
  const { Content } = Layout;

  const steps = [
    {
      title: 'Ordered Summary',
      content: 'First-content',
    },
    {
      title: 'Payment',
      content: 'Second-content',
    },
    {
      title: 'Done',
      content: 'Last-content',
    },
  ];

  return (
    <Content
      style={{
        minHeight: '500px',
        backgroundColor: '#ffffff',
      }}
    >
      <div style={{ maxWidth: '1024px', padding: '1rem', margin: '1rem auto' }}>
        <Space size="large" direction="vertical" style={{ width: '100%' }}>
          <Button
            type="link"
            onClick={() => Router.push('/cart')}
            icon={<LeftOutlined />}
          >
            Back to cart
          </Button>
          <Steps current={0} items={steps} />
        </Space>
      </div>
    </Content>
  );
};

export default CheckoutContent;
