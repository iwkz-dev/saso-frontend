import Head from "next/head";
import { useRouter } from "next/router";
import {
    LogoutOutlined,
    CalendarOutlined,
    PieChartOutlined,
    UserOutlined,
    ReadOutlined,
    ShoppingOutlined,
    UnorderedListOutlined,
    CreditCardOutlined,
    ContactsOutlined,
    ShopOutlined,
    ScanOutlined,
} from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";
import { isAuth, logout } from "../../../helpers/authHelper";
import { Button, Layout, Menu as Menus, Spin } from "antd";

function LoggedIn({ children, title, isNotAllowed }) {
    const router = useRouter();
    const { Header, Footer, Sider, Content } = Layout;

    const [collapsed, setCollapsed] = useState(true);
    const [authChecked, setAuthChecked] = useState(false);
    const [allowed, setAllowed] = useState(false);
    const [current, setCurrent] = useState("/");

    const items = useMemo(
        () => [
            { key: "/", icon: <PieChartOutlined />, label: "Dashboard" },
            { key: "/scan", icon: <ScanOutlined />, label: "Scan" },
            { type: "divider" },
            {
                type: "group",
                label: "Database",
                children: [
                    {
                        key: "/database/event",
                        icon: <CalendarOutlined />,
                        label: "Event",
                    },
                    {
                        key: "/database/category",
                        icon: <UnorderedListOutlined />,
                        label: "Category",
                    },
                    {
                        key: "/database/vendor",
                        icon: <ShopOutlined />,
                        label: "Vendor",
                    },
                    {
                        key: "/database/menu",
                        icon: <ReadOutlined />,
                        label: "Menu",
                    },
                    {
                        key: "/database/payment-type",
                        icon: <CreditCardOutlined />,
                        label: "Payment Type",
                    },
                    {
                        key: "/database/order",
                        icon: <ShoppingOutlined />,
                        label: "Order",
                    },
                    {
                        key: "/database/contact-person",
                        icon: <ContactsOutlined />,
                        label: "Contact Person",
                    },
                    {
                        key: "/database/user",
                        icon: <UserOutlined />,
                        label: "User",
                    },
                ],
            },
        ],
        [],
    );

    useEffect(() => {
        const asPath = (router.asPath || "/").replace(/\/+$/, "") || "/";
        setCurrent(asPath);
    }, [router.asPath]);

    useEffect(() => {
        const authed = !!isAuth();
        if (!authed) {
            setAllowed(false);
            setAuthChecked(true);
            router.replace("/login");
            return;
        }
        if (isNotAllowed) {
            setAllowed(false);
            setAuthChecked(true);
            router.replace("/");
            return;
        }
        setAllowed(true);
        setAuthChecked(true);
    }, [router, isNotAllowed]);

    const onClick = (e) => {
        const key = e.key;
        setCurrent(key);
        router.push(key);
    };

    if (!authChecked) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                <Spin tip="Checking access..." />
            </div>
        );
    }

    if (!allowed) return null;

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Head>
                <title>{title}</title>
            </Head>

            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                theme="dark">
                <div
                    style={{
                        height: 64,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                    }}>
                    <img
                        style={{ maxWidth: "2rem" }}
                        src="/admin/iwkz-logo-no-text.svg"
                        alt="IWKZ logo"
                    />
                </div>

                <Menus
                    mode="inline"
                    theme="dark"
                    onClick={onClick}
                    selectedKeys={[current]}
                    items={items}
                />
            </Sider>

            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: "transparent",
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                    }}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "95%",
                            margin: "0 auto",
                        }}>
                        <div />
                        <img
                            style={{ maxWidth: "3rem" }}
                            src="/admin/iwkz_logo.png"
                            alt="IWKZ logo"
                        />
                        <Button
                            shape="circle"
                            icon={<LogoutOutlined />}
                            onClick={() => {
                                logout(); // make sure this clears tokens/storage
                                router.replace("/login");
                            }}
                        />
                    </div>
                </Header>

                <Content>{children}</Content>

                <Footer style={{ margin: "auto" }}>© 2023 IWKZ Al-Falah</Footer>
            </Layout>
        </Layout>
    );
}

export default LoggedIn;
