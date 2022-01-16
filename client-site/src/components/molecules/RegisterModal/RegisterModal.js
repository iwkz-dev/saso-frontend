import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { submitLogin } from '../../../stores/reducers/login';

const RegisterModal = () => {
  const [open, setOpen] = useState(false);
  const [registerData, setRegisterData] = useState({
    nama: '',
    telefon: '',
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = e => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    // dispatch(submitLogin(registerData));
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Register
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Register</DialogTitle>
        <form
          id="register-form"
          onSubmit={handleSubmit}
          onChange={handleChange}
        >
          <DialogContent>
            {/* <DialogContentText></DialogContentText> */}
            <Grid container rowSpacing={3} columnSpacing={3} pt={1}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="nama"
                  label="Nama Lengkap"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="telefon"
                  label="Nomor Telefon"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="email"
                  label="Email"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={e => {
                handleClose();
              }}
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

export default RegisterModal;
