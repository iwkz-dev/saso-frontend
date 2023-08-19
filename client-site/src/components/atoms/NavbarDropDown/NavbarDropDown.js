import React from "react";
import { Badge, Button, Dropdown } from "antd";
import {
    UserOutlined,
    HistoryOutlined,
    ShoppingCartOutlined,
    LogoutOutlined,
    MenuOutlined,
    SearchOutlined,
    LoginOutlined,
    UserAddOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { isAuth } from "../../../helpers/authHelper";

const NavbarDropDown = ({ onClick, cart }) => {
    const getItems = () => {
        if (isAuth()) {
            return [
                {
                    label: <Link href="/cart">Cart</Link>,
                    key: "0",
                    icon: (
                        <Badge count={cart.items.length} size="small">
                            <ShoppingCartOutlined />
                        </Badge>
                    ),
                },
                {
                    label: <Link href="/my-order">My Order</Link>,
                    key: "1",
                    icon: <HistoryOutlined />,
                },
                {
                    label: <Link href="/search-order">Search order</Link>,
                    key: "2",
                    icon: <SearchOutlined />,
                },
                {
                    type: "divider",
                },

                {
                    label: <div>Logout</div>,
                    key: "logout",
                    icon: <LogoutOutlined />,
                },
            ];
        }
        return [
            {
                label: <Link href="/cart">Cart</Link>,
                key: "0",
                icon: (
                    <Badge count={cart.items.length} size="small">
                        <ShoppingCartOutlined />
                    </Badge>
                ),
            },
            {
                label: <Link href="/search-order">Search order</Link>,
                key: "1",
                icon: <SearchOutlined />,
            },
            {
                type: "divider",
            },
            {
                label: (
                    <Button
                        size="small"
                        type="link"
                        onClick={() => onClick(true)}>
                        Sign in
                    </Button>
                ),
                icon: <LoginOutlined />,
                key: "signIn",
            },
            {
                label: (
                    <Button
                        size="small"
                        onClick={() => onClick(false)}
                        type="link">
                        Sign up
                    </Button>
                ),
                icon: <UserAddOutlined />,
                key: "signUp",
            },
        ];
    };

    return (
        <Dropdown
            style={{ cursor: "pointer" }}
            menu={{
                items: getItems(),
                onClick,
            }}
            trigger={["click"]}>
            <Badge count={cart.items.length}>
                <Button
                    shape="circle"
                    icon={isAuth() ? <UserOutlined /> : <MenuOutlined />}
                />
            </Badge>
        </Dropdown>
    );
};

export default NavbarDropDown;
