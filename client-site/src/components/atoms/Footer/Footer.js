import { Layout } from "antd";
import React from "react";

const FooterComponent = () => {
    return (
        <Layout.Footer
            style={{
                backgroundColor: "#f0fdf4",
                textAlign: "center",
                color: "#6b7280",
                padding: "16px 8px",
                fontSize: 14,
                fontWeight: 500,
                borderTop: "1px solid #d1fae5",
            }}>
            © {new Date().getFullYear()} IWKZ Al-Falah. All rights reserved.
        </Layout.Footer>
    );
};

export default FooterComponent;
