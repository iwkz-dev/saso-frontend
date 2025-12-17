import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Layout, Modal } from "antd";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import { isAuth, logout } from "../../../helpers/authHelper";
import { resetCart, selectCartData } from "../../../stores/reducers/cart";
import NavbarDropDown from "../../atoms/NavbarDropDown/NavbarDropDown";
import SignUpFormModal from "../SignUpFormModal/SignUpFormModal";
import SignInFormModal from "../SignInFormModal/SignInFormModal";
import { clearLoginMessage } from "../../../stores/reducers/login";
import { clearRegisterMessage } from "../../../stores/reducers/register";

const Navbar = () => {
    const dispatch = useDispatch();
    const headerRef = useRef(null);
    const event = useSelector((state) => state.event.data);
    const cart = useSelector((state) =>
        event ? selectCartData(state, event._id) : null,
    );

    console.log(cart);

    const [modalOpen, setModalOpen] = useState(false);
    const [signInMode, setSignInMode] = useState(true);
    const [scrolled, setScrolled] = useState(false);

    const authenticated = useMemo(() => isAuth(), []);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (!headerRef.current) return;

        const el = headerRef.current;
        const updateHeight = () => {
            const h = el.getBoundingClientRect().height || 56;
            document.documentElement.style.setProperty("--navbar-h", `${h}px`);
        };

        updateHeight();

        const ro = new ResizeObserver(updateHeight);
        ro.observe(el);

        return () => ro.disconnect();
    }, []);

    const handleMenuClick = useCallback(
        ({ key }) => {
            switch (key) {
                case "logout":
                    dispatch(resetCart());
                    logout();
                    break;

                case "signIn":
                    setModalOpen(true);
                    setSignInMode(true);
                    break;

                case "signUp":
                    setModalOpen(true);
                    setSignInMode(false);
                    break;

                default:
                    break;
            }
        },
        [dispatch],
    );

    const closeModal = useCallback(() => {
        dispatch(clearLoginMessage());
        dispatch(clearRegisterMessage());
        setModalOpen(false);
    }, [dispatch]);

    const toggleAuthMode = useCallback(() => setSignInMode((v) => !v), []);

    const headerStyle = useMemo(
        () => ({
            position: "sticky",
            top: 0,
            zIndex: 950,
            width: "100%",
            background: scrolled
                ? "rgba(255,255,255,0.95)"
                : "rgba(255,255,255,0.75)",
            backdropFilter: "blur(12px) saturate(180%)",
            WebkitBackdropFilter: "blur(12px) saturate(180%)",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
            boxShadow: scrolled ? "0 6px 12px rgba(0,0,0,0.05)" : "none",
            padding: "8px 16px",
            transition: "all 0.2s ease-in-out",
        }),
        [scrolled],
    );

    return (
        <Layout.Header id="app-navbar" ref={headerRef} style={headerStyle}>
            <div
                style={{
                    maxWidth: 1024,
                    margin: "0 auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                <Link href="/" aria-label="Go to homepage">
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            height: 40,
                            cursor: "pointer",
                        }}>
                        <img
                            src="/images/iwkz_logo.png"
                            alt="IWKZ logo"
                            height={32}
                            style={{ display: "block" }}
                        />
                    </div>
                </Link>

                <NavbarDropDown onClick={handleMenuClick} cart={cart} />
            </div>

            {!authenticated && (
                <Modal
                    title={signInMode ? "Sign in" : "Sign up"}
                    open={modalOpen}
                    onCancel={closeModal}
                    okText={signInMode ? "Sign in" : "Sign up"}
                    okButtonProps={{
                        form: signInMode ? "sign-in" : "sign-up",
                        htmlType: "submit",
                    }}
                    maskClosable={false}
                    closable={false}
                    destroyOnClose
                    centered
                    width={420}>
                    {signInMode ? (
                        <SignInFormModal setShowModal={setModalOpen} />
                    ) : (
                        <SignUpFormModal
                            onSuccess={() => setModalOpen(false)}
                        />
                    )}

                    <div
                        style={{
                            marginTop: 12,
                            display: "flex",
                            justifyContent: "center",
                            gap: 4,
                            fontSize: 12,
                        }}>
                        <span style={{ color: "rgba(0,0,0,0.45)" }}>
                            {signInMode
                                ? "Don't have an account?"
                                : "Already have an account?"}
                        </span>
                        <button
                            type="button"
                            onClick={toggleAuthMode}
                            style={{
                                background: "none",
                                border: "none",
                                padding: 0,
                                color: "#1677ff",
                                fontWeight: 500,
                                cursor: "pointer",
                            }}>
                            {signInMode ? "Sign up" : "Sign in"}
                        </button>
                    </div>
                </Modal>
            )}
        </Layout.Header>
    );
};

export default Navbar;
