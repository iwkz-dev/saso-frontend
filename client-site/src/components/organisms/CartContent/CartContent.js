import { Layout } from 'antd';
import { isAuth } from '../../../helpers/authHelper';
import Unauthorized from '../../atoms/Unauthorized/Unauthorized';

const CartContent = () => {
  const { Content } = Layout;
  return (
    <Content
      style={{
        minHeight: '500px',
        backgroundColor: '#ffffff',
      }}
    >
      {isAuth() ? 'Test my Order' : <Unauthorized />}
    </Content>
  );
};

export default CartContent;
