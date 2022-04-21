import React from 'react';
import styles from './cartdetail.module.scss';
import Button from '@mui/material/Button';

const CartDetail = ({ cart, setOpenOrder, openOrder }) => {
  const handleOrderClick = () => {
    setOpenOrder(!openOrder);
  };

  return (
    <div className={styles.detail}>
      <div className={styles.amountDetail}>
        <span>Total amount:</span>
        <span>{cart.totalAmount}</span>
      </div>
      <div className={styles.priceDetail}>
        <b>Total price:</b>
        <b>{cart.totalPrice} €</b>
      </div>
      <Button size="small" variant="contained" onClick={handleOrderClick}>
        {openOrder ? 'Show Menu' : 'Open Order'}
      </Button>
    </div>
  );
};

export default CartDetail;
