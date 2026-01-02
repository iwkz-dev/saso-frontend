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
    MenuOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Button, Layout, Menu, Spin } from "antd";

import { isAuth, logout } from "../../../helpers/authHelper";

const { Header, Footer, Content } = Layout;

const SIDEBAR_WIDTH = 220;

const MENU_ITEMS = [
    { key: "/", icon: <PieChartOutlined />, label: "Dashboard" },
    { key: "/scan", icon: <ScanOutlined />, label: "Scan Order" },
    {
        key: "database",
        icon: null,
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
            { key: "/database/menu", icon: <ReadOutlined />, label: "Menu" },
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
            { key: "/database/user", icon: <UserOutlined />, label: "User" },
        ],
    },
];

function Protected({ children, title, isNotAllowed }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState("/");

    useEffect(() => {
        if (!isAuth()) router.replace("/login");
        if (isNotAllowed) router.replace("/");
        setLoading(false);
    }, [router, isNotAllowed]);

    useEffect(() => {
        const path = (router.asPath || "/").replace(/\/+$/, "") || "/";
        setCurrent(path);
    }, [router.asPath]);

    const handleMenuClick = ({ key }) => {
        if (key !== current) {
            setCurrent(key);
            setOpen(false);
            router.push(key);
        }
    };

    const defaultOpenKeys = MENU_ITEMS.filter(
        (item) =>
            item.children &&
            item.children.some((child) => child.key === current),
    ).map((item) => item.key);

    if (loading) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <Spin tip="Checking access..." />
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>

            {/* Floating Sidebar */}
            <aside
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    height: "100vh",
                    width: SIDEBAR_WIDTH,
                    background: "#001529",
                    transform: open
                        ? "translateX(0)"
                        : `translateX(-${SIDEBAR_WIDTH}px)`,
                    transition: "transform 0.25s ease",
                    zIndex: 1000,
                }}>
                <div
                    style={{
                        height: 64,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    <img
                        src="/admin/iwkz-logo-no-text.svg"
                        alt="IWKZ logo"
                        style={{ maxWidth: "2rem" }}
                    />
                </div>

                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={[current]}
                    defaultOpenKeys={defaultOpenKeys}
                    onClick={handleMenuClick}
                    items={MENU_ITEMS}
                />
            </aside>

            {/* Backdrop (mobile UX) */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0,0,0,0.4)",
                        zIndex: 999,
                    }}
                />
            )}

            {/* Main layout (FULL WIDTH always) */}
            <Layout style={{ minHeight: "100vh" }}>
                <Header
                    style={{
                        position: "fixed", // Fixes the header at the top
                        top: 0,
                        left: 0,
                        width: "100%",
                        zIndex: 100, // Keeps it above other content
                        padding: "0 1rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        background: "#fff",
                    }}>
                    <Button
                        icon={<MenuOutlined />}
                        type="text"
                        onClick={() => setOpen((v) => !v)}
                    />

                    <img
                        src="/admin/iwkz_logo.png"
                        alt="IWKZ logo"
                        style={{ maxWidth: "3rem" }}
                    />

                    <Button
                        shape="circle"
                        icon={<LogoutOutlined />}
                        onClick={() => {
                            logout();
                            router.replace("/login");
                        }}
                    />
                </Header>

                <Content style={{ padding: "5rem 1rem 1rem 1rem" }}>
                    {children}
                </Content>

                <Footer style={{ textAlign: "center" }}>
                    © 2023 IWKZ Al-Falah
                </Footer>
            </Layout>
        </>
    );
}

export default Protected;
