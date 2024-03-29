import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import styles from "./navbar.module.scss";
import RegisterModal from "../../molecules/RegisterModal/RegisterModal";
import LoginModal from "../../molecules/LoginModal/LoginModal";
import { isAuth, logout } from "../../../helpers/authHelper";

const Navbar = ({
    setOpenOrderList,
    openOrderList,
    openOrder,
    setOpenOrder,
}) => {
    const logoutHandler = () => {
        logout();
    };

    const handleOpenOrderList = () => {
        setOpenOrderList(!openOrderList);
        setOpenOrder(false);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="transparent">
                <Toolbar className={styles.toolbar}>
                    {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            >
            sx={{ mr: 2 }}
            <MenuIcon />
          </IconButton> */}

                    <div className={styles.logoWrapper}>
                        <img src="/images/iwkz_logo.png" alt="iwkz logo" />
                    </div>
                    {!isAuth() ? (
                        <div className={styles.buttonsContainer}>
                            <LoginModal />
                            <RegisterModal />
                        </div>
                    ) : (
                        <div className={styles.buttonsContainer}>
                            <Button
                                onClick={handleOpenOrderList}
                                variant="outlined"
                            >
                                {openOrderList ? "Home" : "My Order"}
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
