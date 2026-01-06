"use client";

import { Layout, Result, Spin, Alert, Button, message } from "antd";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Navbar from "../../molecules/Navbar/Navbar";
import FooterComponent from "../../atoms/Footer/Footer";
import { fetchEventBySlug, fetchEvents } from "../../../stores/reducers/event";
import { checkAuth, requestVerifyEmail } from "../../../stores/reducers/auth";

const { Content } = Layout;

const MainLayout = ({ children, isAuthRequired }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { eventSlug } = router.query;

    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const [authChecked, setAuthChecked] = useState(false);
    const [loadingEmail, setLoadingEmail] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);

    // Fetch events
    useEffect(() => {
        if (!router.isReady) return;

        if (eventSlug) {
            dispatch(fetchEventBySlug(eventSlug));
        } else {
            dispatch(fetchEvents("approved"));
        }
    }, [router.isReady, eventSlug, dispatch]);

    // Check auth on mount
    useEffect(() => {
        const verifyAuth = async () => {
            try {
                await dispatch(checkAuth()).unwrap();
            } catch {
                // Ignore error
            } finally {
                setAuthChecked(true);
            }
        };

        verifyAuth();
    }, [dispatch]);

    // Show alert only if user is unverified
    useEffect(() => {
        if (authChecked && isAuthenticated && user && !user.isVerified) {
            setAlertVisible(true);
        } else {
            setAlertVisible(false);
        }
    }, [authChecked, isAuthenticated, user]);

    const handleResendEmail = async () => {
        setLoadingEmail(true);
        try {
            await dispatch(requestVerifyEmail()).unwrap();
            message.success(
                "Verification email resent! Please check your inbox.",
            );
            setAlertVisible(false); // close modal after successful resend
        } catch (err) {
            console.error("Failed to resend verification email:", err);
            message.error(
                "Failed to resend verification email. Please try again.",
            );
        } finally {
            setLoadingEmail(false);
        }
    };

    // If auth is being checked, show a spinner
    if (isAuthRequired && !authChecked) {
        return (
            <Layout
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#ffffff",
                }}>
                <Navbar />
                <Content
                    style={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    <Spin size="large" tip="Checking authentication..." />
                </Content>
                <FooterComponent />
            </Layout>
        );
    }

    const authorized = !isAuthRequired || isAuthenticated;

    return (
        <Layout
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#ffffff",
            }}>
            <Navbar />

            <Content style={{ flex: 1, padding: "16px" }}>
                {authorized ? (
                    <>
                        {alertVisible && (
                            <Alert
                                type="warning"
                                message={
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}>
                                        <span>
                                            Your email is not verified. Please
                                            check your inbox.
                                        </span>
                                        <Button
                                            type="primary"
                                            size="small"
                                            loading={loadingEmail}
                                            onClick={handleResendEmail}>
                                            Resend Email
                                        </Button>
                                    </div>
                                }
                                closable
                                onClose={() => setAlertVisible(false)}
                                style={{ marginBottom: "16px" }}
                            />
                        )}
                        {children}
                    </>
                ) : (
                    <Result
                        status="403"
                        title="403"
                        subTitle="Sorry, you are not authorized to access this page."
                    />
                )}
            </Content>

            <FooterComponent />
        </Layout>
    );
};

export default MainLayout;
