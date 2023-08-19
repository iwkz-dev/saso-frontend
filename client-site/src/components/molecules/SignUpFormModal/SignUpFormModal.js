import { Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { submitRegister } from "../../../stores/reducers/register";

const SignUpFormModal = () => {
    const dispatch = useDispatch();
    const errorMessage = useSelector(
        (state) => state.register.data.message.error,
    );

    const onFinish = (values) => {
        dispatch(submitRegister(values)).then((response) => {
            console.log(response);
        });
    };

    const layout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 16,
        },
    };

    return (
        <Form {...layout} id="sign-up" onFinish={onFinish}>
            <Form.Item
                label="Full Name"
                name="fullname"
                rules={[
                    {
                        required: true,
                        message: "Please input your full name!",
                    },
                ]}>
                <Input />
            </Form.Item>
            <Form.Item
                label="Phone"
                name="phone"
                rules={[
                    {
                        required: true,
                        message: "Please input your phone number!",
                    },
                ]}>
                <Input />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                        required: true,
                        message: "Please input your email!",
                    },
                ]}>
                <Input />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: "Please input your password!",
                    },
                ]}>
                <Input.Password />
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

export default SignUpFormModal;
