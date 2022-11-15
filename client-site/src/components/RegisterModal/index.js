import React from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import {
  submitRegister,
  textFieldChangeHandler,
  resetRegister,
} from '../../stores/reducers/register';

const RegisterModal = ({ setOpen, open, handleCloseLogin, login }) => {
  const handleClose = () => {
    setOpen(false);
    dispatch(resetRegister());
    if (login) handleCloseLogin()
  };

  const dispatch = useDispatch();
  const userData = useSelector(state => state.register.data.user);
  const errorMessage = useSelector(state => {
    return state.register.data.message.error;
  });
  useSelector(state => {
    if (state.register.data.message.success !== '') {
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
    dispatch(submitRegister(userData));
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Register</DialogTitle>
        <form
          id="register-form"
          onSubmit={handleSubmit}
          onChange={e => handleChange(e.target.name, e.target.value)}
        >
          <DialogContent>
            {/* <DialogContentText></DialogContentText> */}
            <Grid container rowSpacing={3} columnSpacing={3} pt={1}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="fullname"
                  label="Nama Lengkap"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="phone"
                  label="Nomor Telefon"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="email"
                  label="Email"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={6}>
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
              form="register-form"
              type="submit"
            >
              Register
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

RegisterModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  handleCloseLogin: PropTypes.func,
  login: PropTypes.bool,
}

export default RegisterModal;
