import React, { useState } from "react";
import { Button, Form, Input, Modal, Space, Steps, Typography } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import SignInFormModal from "../SignInFormModal/SignInFormModal";
import SignUpFormModal from "../SignUpFormModal/SignUpFormModal";
import { resetLoginMessage } from "../../../stores/reducers/login";
import { resetRegisterMessage } from "../../../stores/reducers/register";
import PaymentMethods from "../PaymentMethods/PaymentMethods";
import StepsContent from "./StepsContent/StepsContent";

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

    const showModalForSignIn = (state) => {
        setIsModalOpen(true);
        setIsSignIn(state);
    };

    const ModalContent = () => {
        if (isSignIn) {
            return <SignInFormModal setShowModal={setIsModalOpen} />;
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

    const stepsContent = () => {
        switch (current) {
            case 0:
                return (
                    <StepsContent
                        userData={userData}
                        onFinish={onFinish}
                        showModalForSignIn={showModalForSignIn}
                    />
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
