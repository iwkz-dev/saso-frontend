import React from "react";
import styles from "./Content.module.scss";
import { Layout } from "antd";

const Content = ({ children }) => {
    return (
        <Layout.Content className={styles.content}>{children}</Layout.Content>
    );
};

export default Content;
