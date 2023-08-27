import { isAuth, logout } from "../../../helpers/authHelper";
import { Layout, Row, Col, Modal } from "antd";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../../../stores/reducers/cart";
import NavbarDropDown from "../../atoms/NavbarDropDown/NavbarDropDown";
import { useState } from "react";
import SignUpFormModal from "../SignUpFormModal/SignUpFormModal";
import SignInFormModal from "../SignInFormModal/SignInFormModal";
import { resetLoginMessage } from "../../../stores/reducers/login";
import { resetRegisterMessage } from "../../../stores/reducers/register";

const Navbar = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.data);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSignIn, setIsSignIn] = useState(false);
    const { Header } = Layout;

    const onClick = ({ key }) => {
        if (key === "logout") {
            dispatch(resetCart());
            logout();
        }

        if (key === "signIn") {
            showSignInModal();
        }

        if (key === "signUp") {
            showSignUpModal(false);
        }
    };

    const showSignInModal = () => {
        setIsModalOpen(true);
        setIsSignIn(true);
    };

    const showSignUpModal = () => {
        setIsModalOpen(true);
        setIsSignIn(false);
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

    return (
        <Header
            style={{
                backgroundColor: "#ffffff",
                borderBottom: "1px solid rgba(149, 157, 165, 0.2)",
                position: "sticky",
                top: 0,
                paddingRight: "1rem",
                paddingLeft: "1rem",
                zIndex: 999,
            }}>
            <Row
                justify="space-between"
                style={{
                    maxWidth: "1024px",
                    margin: "auto",
                }}>
                <Col
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "3rem",
                        cursor: "pointer",
                    }}>
                    <Link href="/">
                        <img
                            style={{ width: "100%" }}
                            src="/images/iwkz_logo.png"
                            alt="iwkz logo"
                        />
                    </Link>
                </Col>
                <Col style={{ textAlign: "right" }}>
                    <NavbarDropDown onClick={onClick} cart={cart} />
                </Col>
            </Row>
            {!isAuth() ? (
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
            ) : (
                <></>
            )}
        </Header>
    );
};
export default Navbar;
