import { Empty, Layout } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { isAuth } from '../../../helpers/authHelper';
import Unauthorized from '../../atoms/Unauthorized/Unauthorized';
import styles from './CartContent.module.scss';
import CartList from '../../molecules/CartList/CartList';
import CartSummary from '../../molecules/CartSummary/CartSummary';
import { addOrder, removeOrder } from '../../../stores/reducers/cart';

const CartContent = () => {
  const { Content } = Layout;
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.data);

  const add = menu => {
    dispatch(addOrder(menu));
  };

  const remove = menu => {
    dispatch(removeOrder(menu));
  };

  if (!isAuth()) {
    return <Unauthorized />;
  }

  return (
    <Content
      className={styles.cartContent}
      style={{
        minHeight: '500px',
        backgroundColor: '#ffffff',
      }}
    >
      <div
        className="test"
        style={{ maxWidth: '1024px', padding: '1rem', margin: '1rem auto' }}
      >
        {cart.items.length <= 0 ? (
          <Empty />
        ) : (
          <div className={styles.Cart}>
            <div className={styles.cartList}>
              <CartList cart={cart} add={add} remove={remove} />
            </div>
            <div className={styles.cartSummary}>
              <CartSummary cart={cart} title="Order Summary" />
            </div>
          </div>
        )}
      </div>
    </Content>
  );
};

export default CartContent;
