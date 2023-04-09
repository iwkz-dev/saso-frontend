import React, { useRef, useState } from 'react';
import Alert from '@mui/material/Alert';
import OrderedMenu from '../../atoms/OrderedMenu/OrderedMenu';
import { Button, Typography, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import styles from './checkOrder.module.scss';
import { submitOrder } from '../../../stores/reducers/order';
import { resetCart } from '../../../stores/reducers/cart';
import { LoadingButton } from '@mui/lab';

const CheckOrder = ({ setOpenOrder, setOpenOrderList }) => {
  const dispatch = useDispatch();
  const form = useRef();
  const cart = useSelector(state => state.cart.data);
  const order = useSelector(state => state.order);
  const events = useSelector(state => state.event.data);
  const [showFailedOrder, setShowFailedOrder] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const backClickHandler = () => {
    setOpenOrder(false);
    setOpenOrderList(false);
  };

  const submitForm = e => {
    e.preventDefault();
    const text = confirm('Please confirm to order');
    if (text) {
      setIsLoading(true);
      setShowFailedOrder(false);
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

      dispatch(submitOrder(orderData)).then(response => {
        if (response.status == 'success') {
          setShowFailedOrder(false);
          setOpenOrderList(true);
          setOpenOrder(false);
          setIsLoading(false);
          dispatch(resetCart());
        } else {
          setShowFailedOrder(true);
          setIsLoading(false);
        }
      });
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
            <OrderedMenu />
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
            {showFailedOrder ? (
              <Grid item xs={12}>
                <Alert severity="error">{order.data.message.error}</Alert>
              </Grid>
            ) : null}
            <Grid item xs={12} className={styles.buttonWrapper}>
              {isLoading ? (
                <LoadingButton
                  loading
                  margin="auto"
                  size="large"
                  variant="outlined"
                >
                  Konfirmasi Pemesanan
                </LoadingButton>
              ) : (
                <Button
                  margin="auto"
                  size="large"
                  variant="outlined"
                  type="submit"
                >
                  Konfirmasi Pemesanan
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default CheckOrder;
