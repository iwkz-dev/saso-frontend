import React from "react";
import Head from "next/head";
import { Layout } from "antd";
import Navbar from "../../molecules/Navbar/Navbar";
import FooterComponent from "../../atoms/Footer/Footer";

const MainLayout = ({ children }) => {
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
                }}
            >
                <Navbar />
                {children}
                <FooterComponent />
            </Layout>
        </>
    );
};

export default MainLayout;
