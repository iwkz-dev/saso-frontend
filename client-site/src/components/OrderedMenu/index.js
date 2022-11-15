import React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import styles from './orderedMenu.module.scss';

const OrderedMenu = () => {
  const cart = useSelector(state => state.cart.data);

  return cart.items.map((item, i) => (
    <div className={styles.orderedMenu} key={i}>
      <Typography className={styles.left}>{item.amount}x</Typography>
      <Typography className={styles.center}>{item.menu.name}</Typography>
      <Typography className={styles.right}>{item.sumPrice}€</Typography>
    </div>
  ));
};

export default OrderedMenu;
