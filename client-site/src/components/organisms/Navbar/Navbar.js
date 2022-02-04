import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import styles from './navbar.module.scss';
import RegisterModal from '../../molecules/RegisterModal/RegisterModal';
import LoginModal from '../../molecules/LoginModal/LoginModal';
import { isAuth } from '../../../helpers/authHelper';

const Navbar = () => {
  React.useEffect(() => {
    {
      console.log(isAuth());
    }
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            >
            sx={{ mr: 2 }}
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            iwkz logo here
          </Typography>
          {!isAuth() ? (
            <div className={styles.buttonsContainer}>
              <LoginModal />
              <RegisterModal />
            </div>
          ) : (
            <Button variant="contained">Logout</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Navbar;
