import { Menu } from "antd";
import {
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

const SIDEBAR_WIDTH = 220;

const MENU_ITEMS = [
    { key: "/", icon: <PieChartOutlined />, label: "Dashboard" },
    { key: "/scan", icon: <ScanOutlined />, label: "Scan Order" },
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

const SideBar = ({ current, handleMenuClick }) => {
    return (
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
                defaultOpenKeys={["database"]} // optional: keep Database open by default
                onClick={handleMenuClick}>
                {MENU_ITEMS.map((item) => {
                    if (item.children) {
                        return (
                            <Menu.SubMenu
                                key={item.key}
                                title={item.label}
                                icon={item.icon}>
                                {item.children.map((child) => (
                                    <Menu.Item
                                        key={child.key}
                                        icon={child.icon}>
                                        {child.label}
                                    </Menu.Item>
                                ))}
                            </Menu.SubMenu>
                        );
                    }

                    if (item.type === "divider")
                        return <Menu.Divider key={Math.random()} />;
                    return (
                        <Menu.Item key={item.key} icon={item.icon}>
                            {item.label}
                        </Menu.Item>
                    );
                })}
            </Menu>
        </aside>
    );
};

export default SideBar;
