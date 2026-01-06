"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Result, Button, Spin } from "antd";

import MainLayout from "../../components/organismus/MainLayout/MainLayout";
import { verifyEmail, resetAuthState } from "../../stores/reducers/auth";

const VerifyEmailPage = () => {
    const router = useRouter();
    const { token } = router.query;
    const dispatch = useDispatch();

    const { verifyStatus, message, error } = useSelector((state) => state.auth);

    // Dispatch verification when token is available
    useEffect(() => {
        if (token) {
            dispatch(verifyEmail(token));
        }
    }, [token, dispatch]);

    // Reset verify state when leaving page
    useEffect(() => {
        return () => {
            dispatch(resetAuthState());
        };
    }, [dispatch]);

    const handleGoHome = () => {
        router.push("/");
    };

    return (
        <MainLayout>
            <div
                style={{
                    width: "100%",
                    maxWidth: "1024px",
                    margin: "0 auto",
                    padding: "24px 16px",
                }}>
                <div
                    style={{
                        marginBottom: 32,
                        justifyContent: "center",
                        textAlign: "center",
                    }}>
                    <Spin
                        size="large"
                        tip="Verifying email..."
                        spinning={verifyStatus === "loading"}>
                        {verifyStatus === "succeeded" && (
                            <Result
                                status="success"
                                title={
                                    message ||
                                    "Your email has been verified successfully!"
                                }
                                extra={
                                    <Button
                                        type="primary"
                                        onClick={handleGoHome}>
                                        Go to Home
                                    </Button>
                                }
                            />
                        )}
                        {verifyStatus === "failed" && (
                            <Result
                                status="error"
                                title="Email verification failed"
                                subTitle={
                                    error ||
                                    "The verification link may be invalid or expired."
                                }
                                extra={
                                    <Button
                                        type="primary"
                                        onClick={handleGoHome}>
                                        Go to Home
                                    </Button>
                                }
                            />
                        )}
                    </Spin>
                </div>
            </div>
        </MainLayout>
    );
};

export default VerifyEmailPage;
