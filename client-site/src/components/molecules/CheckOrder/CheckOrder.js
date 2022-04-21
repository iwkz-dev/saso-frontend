import React from 'react';
import { Button, Typography } from '@mui/material';
import styles from './checkOrder.module.scss';

const CheckOrder = ({ setOpenOrder }) => {
  const backClickHandler = () => {
    setOpenOrder(false);
  };
  return (
    <div className={styles.container}>
      <Button
        variant="outlined"
        size="small"
        onClick={backClickHandler}
        className={styles.backButton}
      >
        {' '}
        Back{' '}
      </Button>
      <Typography>
        Pastikan pemesanan kamu sudah benar dan silakan masukan perkiraan waktu
        untuk penjemputan makanan. Kalau ada informasi tambahan untuk pemesanan
        bisa diinfokan juga dikolom notes.
      </Typography>
    </div>
  );
};

export default CheckOrder;
