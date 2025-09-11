import styles from "./Content.module.scss";
import { Layout, Space } from "antd";

const Content = ({ children }) => {
    return (
        <Layout.Content className={styles.content}>
            <Space direction="vertical" style={{ display: "flex" }}>
                {children}
            </Space>
        </Layout.Content>
    );
};

export default Content;
