import React, { useState } from 'react';
import { useRouter } from 'next/router';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import styles from './navbar.module.scss';
import RegisterModal from '../RegisterModal';
import LoginModal from '../LoginModal';
import { isAuth, logout } from '../../helpers/authHelper';

const Navbar = () => {
  const router = useRouter();
  const logoutHandler = () => {
    logout();
  };
  const [openLogin, setOpenLogin] = useState(false);
  const handleOpenLogin = () => setOpenLogin(true);

  const [openRegister, setOpenRegister] = useState(false);
  const handleOpenRegister = () => setOpenRegister(true);


  const handleOpenOrderList = () => {
    if (router.pathname !== '/my-order') {
      router.push('my-order');
    } else {
      router.push('/');
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar className={styles.toolbar}>
          <div className={styles.logoWrapper}>
            <img src="/images/iwkz_logo.png" alt="iwkz logo" />
          </div>
          {!isAuth() ? (
            <div className={styles.buttonsContainer}>
              <Button
                variant="outlined"
                onClick={handleOpenLogin}
              >
                Login
              </Button>
              <Button variant="contained" onClick={handleOpenRegister}>
                Register
              </Button>
              <LoginModal open={openLogin} setOpen={setOpenLogin} />
              <RegisterModal open={openRegister} setOpen={setOpenRegister} />
            </div>
          ) : (
            <div className={styles.buttonsContainer}>
              <Button onClick={handleOpenOrderList} variant="outlined">
                {router.pathname !== '/my-order' ? 'My Order' : 'Home'}
              </Button>
              <Button onClick={logoutHandler} variant="contained">
                Logout
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Navbar;
