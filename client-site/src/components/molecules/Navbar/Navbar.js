import { useEffect, useState } from "react";
import { Layout, Modal } from "antd";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { isAuth, logout } from "../../../helpers/authHelper";
import { resetCart } from "../../../stores/reducers/cart";
import NavbarDropDown from "../../atoms/NavbarDropDown/NavbarDropDown";
import SignUpFormModal from "../SignUpFormModal/SignUpFormModal";
import SignInFormModal from "../SignInFormModal/SignInFormModal";
import { clearLoginMessage } from "../../../stores/reducers/login";
import { clearRegisterMessage } from "../../../stores/reducers/register";

const Navbar = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.data);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSignIn, setIsSignIn] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const onClick = ({ key }) => {
        if (key === "logout") {
            dispatch(resetCart());
            logout();
            return;
        }
        if (key === "signIn") {
            showSignInModal();
            return;
        }
        if (key === "signUp") {
            showSignUpModal();
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

    const handleCancel = () => {
        dispatch(clearLoginMessage());
        dispatch(clearRegisterMessage());
        setIsModalOpen(false);
    };

    return (
        <Layout.Header
            style={{
                position: "sticky",
                top: 0,
                zIndex: 999,
                width: "100%",
                background: scrolled ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.75)",
                backdropFilter: "blur(12px) saturate(180%)",
                WebkitBackdropFilter: "blur(12px) saturate(180%)",
                borderBottom: "1px solid rgba(0,0,0,0.06)",
                boxShadow: scrolled ? "0 6px 12px rgba(0,0,0,0.05)" : "none",
                padding: "8px 16px",
                transition: "all 0.2s ease-in-out",
            }}
        >
            <div
                style={{
                    maxWidth: 1024,
                    margin: "0 auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Link href="/" aria-label="Go to homepage">
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            height: 40,
                            cursor: "pointer",
                        }}
                    >
                        <img
                            src="/images/iwkz_logo.png"
                            alt="IWKZ logo"
                            style={{
                                height: 32,
                                width: "auto",
                                display: "block",
                                marginRight: 4,
                            }}
                        />
                    </div>
                </Link>

                <div style={{ display: "flex", alignItems: "center" }}>
                    <NavbarDropDown onClick={onClick} cart={cart} />
                </div>
            </div>

            {!isAuth() && (
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
                    destroyOnClose
                    centered
                    width={420}
                    bodyStyle={{
                        padding: 12,
                    }}
                >
                    {isSignIn ? (
                        <SignInFormModal setShowModal={setIsModalOpen} />
                    ) : (
                        <SignUpFormModal
                            onSuccess={() => {
                                setIsModalOpen(false);
                            }}
                        />
                    )}

                    <div
                        style={{
                            marginTop: 12,
                            display: "flex",
                            justifyContent: "center",
                            gap: 4,
                            fontSize: 12,
                        }}
                    >
                        <span style={{ color: "rgba(0,0,0,0.45)" }}>
                            {isSignIn ? "Don't have an account?" : "Already have an account?"}
                        </span>
                        <button
                            type="button"
                            onClick={() => setIsSignIn((v) => !v)}
                            style={{
                                background: "none",
                                border: "none",
                                padding: 0,
                                margin: 0,
                                color: "#1677ff",
                                fontWeight: 500,
                                cursor: "pointer",
                            }}
                        >
                            {isSignIn ? "Sign up" : "Sign in"}
                        </button>
                    </div>
                </Modal>
            )}
        </Layout.Header>
    );
};

export default Navbar;
