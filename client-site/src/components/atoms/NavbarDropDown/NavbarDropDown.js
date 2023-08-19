import { Badge, Button, Dropdown, Modal } from "antd";
import React from "react";
import {
    UserOutlined,
    HistoryOutlined,
    ShoppingCartOutlined,
    LogoutOutlined,
    MenuOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { isAuth } from "../../../helpers/authHelper";

const NavbarDropDown = ({ onClick, cart, showModal }) => {
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
                    type: "divider",
                },

                {
                    label: <div>Logout</div>,
                    key: "2",
                    icon: <LogoutOutlined />,
                },
            ];
        }
        return [
            {
                label: <Link href="/cart">Cart</Link>,
                key: "1",
                icon: (
                    <Badge count={cart.items.length} size="small">
                        <ShoppingCartOutlined />
                    </Badge>
                ),
            },
            {
                type: "divider",
            },
            {
                label: (
                    <Button
                        size="small"
                        type="primary"
                        onClick={() => showModal(true)}>
                        Sign in
                    </Button>
                ),
                key: "3",
            },
            {
                label: (
                    <Button size="small" onClick={() => showModal(false)}>
                        Sign up
                    </Button>
                ),
                key: "4",
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
