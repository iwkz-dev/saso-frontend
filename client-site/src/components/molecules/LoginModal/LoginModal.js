import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import {
  submitLogin,
  textFieldChangeHandler,
  resetLogin,
} from '../../../stores/reducers/login';
import styles from './loginModal.module.scss';

const LoginModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    dispatch(resetLogin());
  };

  const dispatch = useDispatch();
  const userData = useSelector(state => state.login.data.user);
  const errorMessage = useSelector(state => {
    return state.login.data.message.error;
  });
  useSelector(state => {
    if (state.login.data.message.success !== '') {
      handleClose();
    }
  });
  const handleChange = (name, value) => {
    const payload = {
      name,
      value,
    };
    dispatch(textFieldChangeHandler(payload));
  };
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(submitLogin(userData));
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleOpen}
        className={styles.loginButton}
      >
        Login
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <form
          id="login-form"
          onSubmit={handleSubmit}
          onChange={e => handleChange(e.target.name, e.target.value)}
        >
          <DialogContent>
            {/* <DialogContentText></DialogContentText> */}
            <Grid container rowSpacing={3} pt={1}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="email"
                  label="Email"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  variant="outlined"
                  type="password"
                  required
                />
              </Grid>
            </Grid>
            <span className="text-xs text-red-700 ">{errorMessage}</span>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              // onClick={e => {
              //   console.log('asdasd');
              //   handleClose();
              // }}
              form="login-form"
              type="submit"
            >
              Login
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default LoginModal;
