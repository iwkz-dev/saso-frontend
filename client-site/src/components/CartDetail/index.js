import React from 'react';
import PropTypes from 'prop-types';
import styles from './cartdetail.module.scss';
import Button from '@mui/material/Button';

const CartDetail = ({ cart, setOpenOrder, openOrder, setMobileActive }) => {
  const handleOrderClick = () => {
    setOpenOrder(!openOrder);
    setMobileActive(false);
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
        Checkout
      </Button>
    </div>
  );
};

CartDetail.propTypes = {
  cart: PropTypes.object,
  setOpenOrder: PropTypes.func,
  openOrder: PropTypes.bool,
  setMobileActive: PropTypes.func,
}

export default CartDetail;
