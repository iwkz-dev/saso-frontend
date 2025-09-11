import React from "react";
import Head from "next/head";
import LoginForm from "../src/components/Form/Login/LoginForm";

export default function LoginPage() {
    const pageStyle = {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 16px",
        background:
            "linear-gradient(180deg, rgba(245,248,255,1) 0%, rgba(252,252,252,1) 100%)",
    };

    return (
        <div>
            <Head>
                <title>Saso App | Login</title>
            </Head>
            <main style={pageStyle}>
                <LoginForm />
            </main>
        </div>
    );
}
