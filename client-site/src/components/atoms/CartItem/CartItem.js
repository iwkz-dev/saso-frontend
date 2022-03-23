import React from 'react';
import styles from './cartItem.module.scss';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';

const CartItem = ({ cartItem }) => {
  return (
    <div className={styles.cartItem} key={cartItem.name}>
      <div className={styles.amount}>
        <b>{cartItem.amount}</b>
      </div>
      <div className={styles.menuDetail}>
        <div className={styles.nameAndPrice}>
          <div className={styles.menuTitle}>
            <b>{cartItem.name}</b>
          </div>
          <div className={styles.menuPrice}>
            <b>{cartItem.sumPrice} €</b>
          </div>
        </div>
        <div className={styles.buttons}>
          <div className={styles.btn}>
            <AiOutlineMinusCircle className={styles.minus} />
          </div>
          <div className={styles.btn}>
            <AiOutlinePlusCircle className={styles.plus} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
