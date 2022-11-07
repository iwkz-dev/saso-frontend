import React from 'react';
import PropTypes from 'prop-types';
import styles from './cartItem.module.scss';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';

const CartItem = ({ cartItem, add, remove }) => {
  const menu = cartItem.menu;
  const amount = cartItem.amount;
  const price = cartItem.sumPrice;
  return (
    <div className={styles.cartItem}>
      <div className={styles.amount}>{amount}</div>
      <div className={styles.menuDetail}>
        <div className={styles.nameAndPrice}>
          <div className={styles.menuTitle}>{menu.name}</div>
          <div className={styles.menuPrice}>{price} €</div>
        </div>
        <div className={styles.buttons}>
          <div className={styles.btn} onClick={() => remove(menu)}>
            <AiOutlineMinusCircle className={styles.minus} />
          </div>
          <div className={styles.btn} onClick={() => add(menu)}>
            <AiOutlinePlusCircle className={styles.plus} />
          </div>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  cartItem: PropTypes.object,
  add: PropTypes.func,
  remove: PropTypes.func
}
export default CartItem;
