import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { submitLogin } from "../../../stores/reducers/login";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Router from "next/router";

const SignInFormModal = ({ setShowModal }) => {
    const dispatch = useDispatch();
    const errorMessage = useSelector((state) => state.login.data.message.error);

    const onFinish = (values) => {
        values.type = "client";
        dispatch(submitLogin(values)).then((response) => {
            if (response.status !== "success") {
                setShowModal(true);
            } else {
                setShowModal(false);
                Router.reload();
            }
        });
    };

    const forgotPasswordOnClick = () => {
        Router.push("/forgot-password");
    };

    return (
        <Form id="sign-in" onFinish={onFinish}>
            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        message: "Please input your email!",
                    },
                ]}
            >
                <Input
                    id="email"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Email"
                />
            </Form.Item>
            <Form.Item
                name="password"
                id="password"
                rules={[
                    {
                        required: true,
                        message: "Please input your password!",
                    },
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Button
                style={{ padding: 0 }}
                type="link"
                onClick={() => forgotPasswordOnClick()}
            >
                Forgot password?
            </Button>
            <div
                style={{
                    fontSize: 12,
                    marginBottom: 24,
                    color: "red",
                }}
            >
                {errorMessage}
            </div>
        </Form>
    );
};

export default SignInFormModal;
