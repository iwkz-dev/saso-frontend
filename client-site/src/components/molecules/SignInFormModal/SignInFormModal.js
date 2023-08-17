import { Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { submitLogin } from "../../../stores/reducers/login";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const SignInFormModal = () => {
    const dispatch = useDispatch();
    const errorMessage = useSelector((state) => state.login.data.message.error);

    const onFinish = (values) => {
        values.type = "client";
        dispatch(submitLogin(values));
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
                ]}>
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Email"
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
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <div
                style={{
                    fontSize: 12,
                    marginBottom: 24,
                    color: "red",
                }}>
                {errorMessage}
            </div>
        </Form>
    );
};

export default SignInFormModal;
