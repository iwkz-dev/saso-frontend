import React, { useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import { submitLogin } from "../../../store/reducers/loginReducer";
import { isAuth } from "../../../helpers/authHelper";
import { Button, Form, Input, Typography } from "antd";
import styles from "./LoginForm.module.scss";

function LoginForm() {
    const dispatch = useDispatch();
    const errorMessage = useSelector((state) => state.login.data.message.error);

    useEffect(() => {
        if (isAuth()) {
            Router.push("/");
        }
    }, []);

    const onFinish = (values) => {
        values.type = "admin";
        dispatch(submitLogin(values));
    };

    return (
        <div className={styles.loginForm}>
            <Typography>
                <Typography.Title level={3}>Login</Typography.Title>
            </Typography>
            <Form onFinish={onFinish} autoComplete="off">
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please input your email!",
                        },
                    ]}>
                    <Input
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}>
                    <Input.Password
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        }
                    />
                </Form.Item>
                <div
                    style={{
                        fontSize: 12,
                        marginBottom: 24,
                        textAlign: "center",
                        color: "red",
                    }}>
                    {errorMessage}
                </div>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default LoginForm;
