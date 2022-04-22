import React from 'react';
import styles from './userFormOrder.module.scss';
import { Button, Typography } from '@mui/material';
import LoginModal from '../LoginModal/LoginModal';
import RegisterForm from '../RegisterForm/RegisterForm';

const UserFormOrder = ({ setOpenOrder }) => {
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
      <Typography gutterBottom variant="h5" component="div">
        Order
      </Typography>
      <div className={styles.content}>
        <div className={styles.login}>
          <Typography variant="body1" color="text.primary">
            Sudah punya akun?
          </Typography>
          <LoginModal />
        </div>
        <hr />
        <div className={styles.register}>
          <Typography variant="body1" color="text.primary">
            Silahkan daftar
          </Typography>
          <RegisterForm />
        </div>
      </div>
      <hr />
      <Typography variant="body2" color="text.secondary">
        <ul>
          <li>Pembayaran maksimal H + 1</li>
          <li>Pesanan yang sudah dibayar tidak bisa dibatalkan</li>
        </ul>
      </Typography>
    </div>
  );
};

export default UserFormOrder;
