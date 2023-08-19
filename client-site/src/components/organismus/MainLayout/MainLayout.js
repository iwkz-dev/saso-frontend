import React from "react";
import Head from "next/head";
import { Layout, Result } from "antd";
import Navbar from "../../molecules/Navbar/Navbar";
import FooterComponent from "../../atoms/Footer/Footer";
import { isAuth } from "../../../helpers/authHelper";

const MainLayout = ({ children, isAuthRequired }) => {
    const { Footer } = Layout;
    return (
        <>
            <Head>
                <title>IWKZ E-Commerce</title>
                <meta name="description" content="Saso Application" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout
                style={{
                    backgroundColor: "#ffffff",
                    minHeight: "100vh",
                }}>
                <Navbar />
                {isAuth() || !isAuthRequired ? (
                    children
                ) : (
                    <Result
                        status="403"
                        title="403"
                        subTitle="Sorry, you are not authorized to access this page."
                    />
                )}
                <FooterComponent />
            </Layout>
        </>
    );
};

export default MainLayout;
