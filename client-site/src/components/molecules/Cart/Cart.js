import React from 'react';
import styles from './cart.module.scss';
import { Card, CardContent, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
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
  const cart = useSelector(state => state.cart.data);
  console.log(cart);
  return (
    <Card className={styles.cartContainer}>
      <CardContent>
        <div className={styles.title}>Keranjang Belanja</div>
        <div className={styles.content}>
          <div className={styles.orderedList}>
            {Object.values(cart).map(value => (
              <div key={value.name}>
                <div>{value.name}</div>
                <div>{value.amount}</div>
              </div>
            ))}
          </div>
          <Divider />
          <div className={styles.detail}></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Cart;
