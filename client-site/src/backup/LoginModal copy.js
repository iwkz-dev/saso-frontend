import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import {
    submitLogin,
    textFieldChangeHandler,
    resetLogin,
} from "../../../stores/reducers/login";
import styles from "./loginModal.module.scss";
import { Box } from "@mui/system";
import { BASE_URL_HOST } from "../../../config/config";
import { LoadingButton } from "@mui/lab";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LoginModal = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setIsForgotPassword(false);
        setForgotPasswordErrorMessage("");
        dispatch(resetLogin());
    };

    // CHANGE MODAL FORGOT PASSWORD AND LOGIN
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [forgotPasswordErrorMessage, setForgotPasswordErrorMessage] =
        useState("");

    const handleModalForgotPassword = () => {
        setIsForgotPassword(true);
    };
    useEffect(() => {
        setIsForgotPassword(false);
        setIsLoading(false);
    }, []);

    const dispatch = useDispatch();
    const userData = useSelector((state) => state.login.data.user);
    const errorMessage = useSelector((state) => {
        return state.login.data.message.error;
    });
    useSelector((state) => {
        if (state.login.data.message.success !== "") {
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
    const handleSubmit = (e) => {
        e.preventDefault();
        setForgotPasswordErrorMessage("");
        dispatch(resetLogin());
        if (isForgotPassword) {
            dispatch(resetLogin());
            setIsLoading(true);
            axios({
                url: `${BASE_URL_HOST}/auth/forget-password`,
                method: "patch",
                data: {
                    email: userData.email,
                },
            })
                .then((response) => {
                    if (response.status === 200) {
                        handleClose();
                        handleClickSnackbar();
                    }
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setIsLoading(false);
                    setForgotPasswordErrorMessage(err.response.data.message);
                });
        } else {
            dispatch(submitLogin(userData));
        }
    };

    //
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const handleClickSnackbar = () => {
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <div>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    Link change password has been sent. Please check your email!
                </Alert>
            </Snackbar>
            <Button
                variant="outlined"
                onClick={handleOpen}
                className={styles.loginButton}
            >
                Login
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    {isForgotPassword ? "Forget Password" : "Login"}
                </DialogTitle>
                {!isForgotPassword ? (
                    ""
                ) : (
                    <Box
                        sx={{
                            marginX: "1.5em",
                        }}
                    >
                        We send you link to your email for changing your
                        password
                    </Box>
                )}
                <form
                    id="login-form"
                    onSubmit={handleSubmit}
                    onChange={(e) =>
                        handleChange(e.target.name, e.target.value)
                    }
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
                            {isForgotPassword ? (
                                ""
                            ) : (
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
                            )}
                        </Grid>
                        <span style={{ color: "red", fontSize: "12px" }}>
                            {isForgotPassword
                                ? forgotPasswordErrorMessage
                                : errorMessage}
                        </span>
                        {isForgotPassword ? (
                            ""
                        ) : (
                            <Button
                                onClick={handleModalForgotPassword}
                                sx={{
                                    display: isForgotPassword
                                        ? "hidden"
                                        : "block",
                                    padding: 0,
                                    marginTop: "10px",
                                    "&:hover": {
                                        backgroundColor: "#fff",
                                    },
                                }}
                            >
                                Forget Password?
                            </Button>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        {isLoading ? (
                            <LoadingButton loading variant="outlined">
                                Submit
                            </LoadingButton>
                        ) : (
                            <Button
                                // onClick={e => {
                                //   console.log('asdasd');
                                //   handleClose();
                                // }}
                                form="login-form"
                                type="submit"
                            >
                                {isForgotPassword ? "Send Email" : "Login"}
                            </Button>
                        )}
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default LoginModal;
