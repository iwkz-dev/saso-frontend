import React, { useState } from "react";
import { Button, Form, Input, Modal, Space, Steps, Typography } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import SignInFormModal from "../SignInFormModal/SignInFormModal";
import SignUpFormModal from "../SignUpFormModal/SignUpFormModal";
import { resetLoginMessage } from "../../../stores/reducers/login";
import { resetRegisterMessage } from "../../../stores/reducers/register";
import PaymentMethods from "../PaymentMethods/PaymentMethods";

const CheckoutGuestForm = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSignIn, setIsSignIn] = useState(false);
    const [current, setCurrent] = useState(0);
    const [userData, setUserData] = useState({
        fullname: "",
        email: "",
        phone: "",
    });

    const showModal = (state) => {
        setIsModalOpen(true);
        setIsSignIn(state);
    };

    const ModalContent = () => {
        if (isSignIn) {
            return <SignInFormModal />;
        }

        return <SignUpFormModal />;
    };

    const handleCancel = () => {
        dispatch(resetLoginMessage());
        dispatch(resetRegisterMessage());
        setIsModalOpen(false);
    };

    const onFinish = (values) => {
        setUserData(values);
        setCurrent(1);
    };

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };

    const stepsContent = () => {
        switch (current) {
            case 0:
                return (
                    <Space
                        direction="vertical"
                        style={{
                            width: "100%",
                        }}>
                        <Form
                            initialValues={userData}
                            id="guest-information"
                            {...layout}
                            size="small"
                            onFinish={onFinish}>
                            <Form.Item
                                label="Full Name"
                                name="fullname"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your full name!",
                                    },
                                ]}>
                                <Input id="fullname" placeholder="Full Name" />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your email!",
                                    },
                                    {
                                        type: "email",
                                    },
                                ]}>
                                <Input id="email" placeholder="Email" />
                            </Form.Item>
                            <Form.Item
                                label="Phone Nr."
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input your phone number!",
                                    },
                                ]}>
                                <Input id="phone" placeholder="Phone Number" />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Continue Payment
                                </Button>
                            </Form.Item>
                        </Form>
                        <Space>
                            <Typography.Text>
                                Already have an account?
                            </Typography.Text>
                            <Button
                                size="small"
                                onClick={() => showModal(true)}
                                type="link">
                                Log in
                            </Button>
                        </Space>
                    </Space>
                );
            default:
                return (
                    <Space
                        direction="vertical"
                        size="large"
                        style={{
                            width: "100%",
                        }}>
                        <Button
                            type="link"
                            onClick={() => setCurrent(0)}
                            icon={<LeftOutlined />}>
                            Back to contact information
                        </Button>
                        <PaymentMethods userData={userData} />
                    </Space>
                );
        }
    };

    return (
        <div
            style={{
                width: "100%",
                maxWidth: "300px",
                margin: "0 auto",
            }}>
            <Space
                direction="vertical"
                size="large"
                style={{
                    width: "100%",
                }}>
                <Steps
                    size="small"
                    current={current}
                    items={[
                        {
                            title: "Contact Information",
                        },
                        {
                            title: "Payment",
                        },
                    ]}
                />
                {stepsContent()}
            </Space>
            <Modal
                title={isSignIn ? "Sign in" : "Sign up"}
                okButtonProps={{
                    form: isSignIn ? "sign-in" : "sign-up",
                    htmlType: "submit",
                }}
                open={isModalOpen}
                okText={isSignIn ? "Sign in" : "Sign up"}
                onCancel={handleCancel}
                closable={false}
                destroyOnClose={true}>
                {ModalContent()}
            </Modal>
        </div>
    );
};

export default CheckoutGuestForm;
