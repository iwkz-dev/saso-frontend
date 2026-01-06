"use client";

import { Layout, Result, Spin } from "antd";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Navbar from "../../molecules/Navbar/Navbar";
import FooterComponent from "../../atoms/Footer/Footer";
import { fetchEventBySlug, fetchEvents } from "../../../stores/reducers/event";
import { checkAuth } from "../../../stores/reducers/auth";

const { Content } = Layout;

const MainLayout = ({ children, isAuthRequired }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { eventSlug } = router.query;

    const { isAuthenticated } = useSelector((state) => state.auth);
    const [authChecked, setAuthChecked] = useState(false);

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
                // Ignore error, isAuthenticated will be false
            } finally {
                setAuthChecked(true);
            }
        };

        verifyAuth();
    }, [dispatch, isAuthRequired]);

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

            {/* Main content grows and pushes footer down */}
            <Content style={{ flex: 1 }}>
                {authorized ? (
                    children
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
