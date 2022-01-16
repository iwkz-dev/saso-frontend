import React from 'react';
import styles from './cart.module.scss';
const items = [
  {
    amount: 2,
    name: 'garlic potatoes',
    price: 23,
  },
  {
    amount: 5,
    name: 'hot potatoes',
    price: 23,
  },
  {
    amount: 1,
    name: 'teriyaki potatoes',
    price: 23,
  },
];
const Cart = () => {
  return (
    <div className={styles.cartContainer}>
      {/* <div className={styles.title}>Keranjang Belanja</div>
      <div className={styles.content}>
        <div className={styles.orderedList}>
          {items.map(e => (
            <div>{e.name}</div>
          ))}
        </div>
        <hr />
        <div className={styles.detail}></div>
      </div> */}
    </div>
  );
};

export default Cart;
