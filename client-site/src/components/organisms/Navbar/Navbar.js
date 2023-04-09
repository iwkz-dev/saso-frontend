import { isAuth, logout } from '../../../helpers/authHelper';
import { Layout, Row, Col, Dropdown, Button, Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import Link from 'next/link';
import {
  LogoutOutlined,
  UserOutlined,
  HistoryOutlined,
} from '@ant-design/icons';
import LoginModal from '../../molecules/LoginModal/LoginModal';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const cart = useSelector(state => state.cart.data);

  console.log(cart.items);
  const { Header } = Layout;

  const logoutHandler = () => {
    logout();
  };

  const items = [
    {
      label: <Link href="/my-order">My Order</Link>,
      key: '0',
      icon: <HistoryOutlined />,
    },
    {
      label: <Link href="/cart">Cart</Link>,
      key: '1',
      icon: (
        <Badge count={cart.items.length} size="small">
          <ShoppingCartOutlined />
        </Badge>
      ),
    },
    {
      type: 'divider',
    },
    {
      label: <div onClick={logoutHandler}>Logout</div>,
      key: '2',
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <Header
      style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid rgba(149, 157, 165, 0.2)',
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
      }}
    >
      <Row justify="space-between">
        <Col
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '3rem',
            cursor: 'pointer',
          }}
        >
          <Link href="/">
            <img
              style={{ width: '100%' }}
              src="/images/iwkz_logo.png"
              alt="iwkz logo"
            />
          </Link>
        </Col>
        <Col style={{ textAlign: 'right' }}>
          {isAuth() ? (
            <Dropdown
              style={{ cursor: 'pointer' }}
              menu={{
                items,
              }}
              trigger={['click']}
            >
              <Badge count={cart.items.length}>
                <Button shape="circle" icon={<UserOutlined />} />
              </Badge>
            </Dropdown>
          ) : (
            <LoginModal />
          )}
        </Col>
      </Row>
    </Header>
  );
};
export default Navbar;
