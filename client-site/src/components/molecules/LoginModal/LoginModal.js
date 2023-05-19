import { Button, Modal, Space } from "antd";
import React, { useState } from "react";
import SignUpFormModal from "../SignUpFormModal/SignUpFormModal";
import SignInFormModal from "../SignInFormModal/SignInFormModal";
import { useDispatch } from "react-redux";
import { resetLoginMessage } from "../../../stores/reducers/login";
import { resetRegisterMessage } from "../../../stores/reducers/register";

const LoginModal = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSignIn, setIsSignIn] = useState(false);

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

    return (
        <Space>
            <Button size="small" onClick={() => showModal(false)}>
                Sign up
            </Button>
            <Button size="small" type="primary" onClick={() => showModal(true)}>
                Sign in
            </Button>
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
                destroyOnClose={true}
            >
                {ModalContent()}
            </Modal>
        </Space>
    );
};

export default LoginModal;
