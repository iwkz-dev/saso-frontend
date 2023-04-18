import { Empty } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { isAuth } from '../../../helpers/authHelper';
import Unauthorized from '../../atoms/Unauthorized/Unauthorized';
import styles from './CartContent.module.scss';
import CartList from '../../molecules/CartList/CartList';
import CartSummary from '../../molecules/CartSummary/CartSummary';
import { addOrder, removeOrder } from '../../../stores/reducers/cart';
import ContentLayout from '../ContentLayout/ContentLayout';

const CartContent = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.data);

  const add = menu => {
    dispatch(addOrder(menu));
  };

  const remove = menu => {
    dispatch(removeOrder(menu));
  };

  if (!isAuth()) {
    return (
      <ContentLayout>
        <Unauthorized />
      </ContentLayout>
    );
  }

  return (
    <ContentLayout className={styles.cartContent}>
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
    </ContentLayout>
  );
};

export default CartContent;
