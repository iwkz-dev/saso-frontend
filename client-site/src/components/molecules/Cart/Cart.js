import React from 'react';
import styles from './cart.module.scss';
import { Card, CardContent, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import CartItem from '../../atoms/CartItem/CartItem';
import CartDetail from '../../atoms/CartDetail/CartDetail';

const Cart = () => {
  const cart = useSelector(state => state.cart);

  return (
    <Card className={styles.cartContainer}>
      <CardContent className={styles.cartContent}>
        <Typography
          className={styles.cartTitle}
          gutterBottom
          variant="h6"
          component="div"
        >
          Keranjang Belanja
        </Typography>
        <div className={styles.content}>
          <div className={styles.orderedList}>
            {Object.values(cart.data).map(cartItem => (
              <CartItem key={cartItem._id} cartItem={cartItem} />
            ))}
          </div>
          <Divider />
          <CartDetail cart={cart} />
        </div>
      </CardContent>
    </Card>
  );
};

export default Cart;
