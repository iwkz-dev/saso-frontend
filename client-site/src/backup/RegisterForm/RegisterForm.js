import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import styles from "./registerForm.module.scss";
import {
    submitRegister,
    textFieldChangeHandler,
    resetRegister,
} from "../../../stores/reducers/register";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.register.data.user);
    const errorMessage = useSelector((state) => {
        return state.register.data.message.error;
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
        dispatch(submitRegister(userData));
    };

    return (
        <div className={styles.container}>
            <form
                id="register-form"
                onSubmit={handleSubmit}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
            >
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
                <Button
                    className={styles.registerButton}
                    variant="contained"
                    form="register-form"
                    type="submit"
                >
                    Register
                </Button>
            </form>
        </div>
    );
};

export default RegisterForm;
