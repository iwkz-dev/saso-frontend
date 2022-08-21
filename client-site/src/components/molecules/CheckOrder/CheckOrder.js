import React, { useRef, useState } from 'react';
import { Button, Typography, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import styles from './checkOrder.module.scss';
import { submitOrder } from '../../../stores/reducers/order';

const CheckOrder = ({ setOpenOrder }) => {
  const form = useRef();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const events = useSelector(state => state.event.data);
  console.log(cart, events[0]);

  const orderedMenuElem = () => {
    return cart.items.map((item, i) => (
      <div className={styles.orderedMenu} key={i}>
        <Typography className={styles.left}>{item.amount}x</Typography>
        <Typography className={styles.center}>{item.menu.name}</Typography>
        <Typography className={styles.right}>{item.sumPrice}€</Typography>
      </div>
    ));
  };

  const backClickHandler = () => {
    setOpenOrder(false);
  };

  const submitForm = e => {
    console.log(e);
    e.preventDefault();
    const text = confirm('Please confirm to order');
    if (text) {
      const data = new FormData(form.current);
      const note = data.get('note');
      const arrivedAt = data.get('arrived_at');
      const event = events[0]._id;
      const menus = [];
      cart.items.forEach(item => {
        menus.push({
          _id: item.menu._id,
          totalPortion: item.amount,
        });
      });
      const orderData = {
        event: event,
        note: note,
        arrivedAt: arrivedAt,
        menus: menus,
      };
      dispatch(submitOrder(orderData));
    }
  };

  return (
    <div className={styles.container}>
      <Button
        variant="outlined"
        size="small"
        onClick={backClickHandler}
        className={styles.backButton}
      >
        Back
      </Button>
      <div className={styles.orderedInfo}>
        <Grid container rowSpacing={3} pt={1}>
          <Grid item xs={12}>
            <Typography align="center">
              Mohon pastikan bahwa pemesanan kamu sudah benar.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {orderedMenuElem()}
          </Grid>
          <Grid item xs={12}>
            <Typography align="center">
              <b>Total: {cart.totalPrice}€</b>
            </Typography>
          </Grid>
        </Grid>
      </div>
      <Divider />
      <div>
        <form ref={form} id="order-form" onSubmit={e => submitForm(e)}>
          <Grid container rowSpacing={3} pt={1}>
            <Grid item xs={12}>
              <Typography align="center">
                Silahkan masukan perkiraan waktu untuk penjemputan makanan.
                Kalau ada informasi tambahan untuk pemesanan bisa diinfokan juga
                dikolom notes.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="arrived_at"
                label="Waktu Pengambilan"
                variant="outlined"
                type="time"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="note"
                label="Note"
                variant="outlined"
                type="text"
                multiline
                rows={2}
                maxRows={4}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                margin="auto"
                size="large"
                variant="outlined"
                type="submit"
              >
                Konfirmasi Pemesanan
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default CheckOrder;
