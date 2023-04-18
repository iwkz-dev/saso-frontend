import { Steps } from 'antd';
import { Layout } from 'antd';

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
        <Steps current={0} items={steps} />
      </div>
    </Content>
  );
};

export default CheckoutContent;
