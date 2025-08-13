import { useState } from "react";
import { Button, Modal, Space, Steps } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import SignInFormModal from "../SignInFormModal/SignInFormModal";
import SignUpFormModal from "../SignUpFormModal/SignUpFormModal";
import { resetLoginMessage } from "../../../stores/reducers/login";
import { resetRegisterMessage } from "../../../stores/reducers/register";
import PaymentMethods from "../PaymentMethods/PaymentMethods";
import FormStepContent from "./StepsContent/FormStepContent";

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

    const ModalContent = () =>
        isSignIn ? (
            <SignInFormModal setShowModal={setIsModalOpen} />
        ) : (
            <SignUpFormModal />
        );

    const handleCancel = () => {
        dispatch(resetLoginMessage());
        dispatch(resetRegisterMessage());
        setIsModalOpen(false);
    };

    const onFinish = (values) => {
        setUserData(values);
        setCurrent(1);
    };

    return (
        <div style={{ width: "100%", maxWidth: 520, margin: "8px auto 0" }}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
                <Steps
                    size="small"
                    current={current}
                    style={{ width: "100%", maxWidth: 360, margin: "0 auto" }}
                    items={[{ title: "Contact" }, { title: "Payment" }]}
                />

                {current === 0 ? (
                    <FormStepContent
                        userData={userData}
                        onFinish={onFinish}
                        showModalForSignIn={showModalForSignIn}
                    />
                ) : (
                    <Space
                        direction="vertical"
                        size="middle"
                        style={{ width: "100%" }}>
                        <Button
                            type="link"
                            onClick={() => setCurrent(0)}
                            icon={<LeftOutlined />}>
                            Back to contact information
                        </Button>
                        <PaymentMethods userData={userData} />
                    </Space>
                )}
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
                destroyOnHidden>
                {ModalContent()}
            </Modal>
        </div>
    );
};

export default CheckoutGuestForm;
