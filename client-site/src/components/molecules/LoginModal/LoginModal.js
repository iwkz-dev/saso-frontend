import { useState } from "react";
import { Button, Modal, Space } from "antd";
import { useDispatch } from "react-redux";
import SignUpFormModal from "../SignUpFormModal/SignUpFormModal";
import SignInFormModal from "../SignInFormModal/SignInFormModal";
import { clearLoginMessage } from "../../../stores/reducers/login";
import { clearRegisterMessage } from "../../../stores/reducers/register";

const LoginModal = ({ size = "small" }) => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSignIn, setIsSignIn] = useState(false);

    const openModal = (signIn = false) => {
        setIsModalOpen(true);
        setIsSignIn(signIn);
    };

    const handleCancel = () => {
        dispatch(clearLoginMessage());
        dispatch(clearRegisterMessage());
        setIsModalOpen(false);
    };

    return (
        <Space
            align="center"
            style={{ width: "100%", justifyContent: "center", gap: 8 }}>
            <Button size={size} onClick={() => openModal(false)}>
                Sign up
            </Button>
            <Button size={size} onClick={() => openModal(true)} type="link">
                Sign in
            </Button>

            <Modal
                title={isSignIn ? "Sign in" : "Sign up"}
                open={isModalOpen}
                onCancel={handleCancel}
                okText={isSignIn ? "Sign in" : "Sign up"}
                okButtonProps={{
                    form: isSignIn ? "sign-in" : "sign-up",
                    htmlType: "submit",
                }}
                maskClosable={false}
                closable={false}
                destroyOnHidden
                centered
                width={420}
                style={{ padding: 12 }}>
                {isSignIn ? (
                    <SignInFormModal setShowModal={setIsModalOpen} />
                ) : (
                    <SignUpFormModal onSuccess={() => setIsModalOpen(false)} />
                )}

                <div
                    style={{
                        marginTop: 8,
                        display: "flex",
                        justifyContent: "center",
                        gap: 4,
                        fontSize: 12,
                    }}>
                    <span style={{ color: "rgba(0,0,0,0.45)" }}>
                        {isSignIn
                            ? "Don't have an account?"
                            : "Already have an account?"}
                    </span>
                    <button
                        type="button"
                        onClick={() => setIsSignIn((v) => !v)}
                        style={{
                            background: "none",
                            border: "none",
                            padding: 0,
                            color: "#1677ff",
                            cursor: "pointer",
                        }}>
                        {isSignIn ? "Sign up" : "Sign in"}
                    </button>
                </div>
            </Modal>
        </Space>
    );
};

export default LoginModal;
