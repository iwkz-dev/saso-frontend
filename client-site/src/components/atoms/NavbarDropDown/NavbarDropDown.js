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
import { useRouter } from "next/router";

const NavbarDropDown = ({ onClick, cart }) => {
    const router = useRouter();
    const { eventSlug } = router.query;

    const getItems = () => {
        const showEventItems = !!eventSlug;

        if (isAuth()) {
            const items = [];

            if (showEventItems) {
                items.push(
                    {
                        label: <Link href={`/${eventSlug}/cart`}>Cart</Link>,
                        key: "0",
                        icon: (
                            <Badge count={cart.items.length} size="small">
                                <ShoppingCartOutlined />
                            </Badge>
                        ),
                    },
                    {
                        label: (
                            <Link href={`/${eventSlug}/my-order`}>
                                My Order
                            </Link>
                        ),
                        key: "1",
                        icon: <HistoryOutlined />,
                    },
                    {
                        label: (
                            <Link href={`/${eventSlug}/search-order`}>
                                Search order
                            </Link>
                        ),
                        key: "2",
                        icon: <SearchOutlined />,
                    },
                    { type: "divider" },
                );
            }

            items.push({
                label: <div>Logout</div>,
                key: "logout",
                icon: <LogoutOutlined />,
            });

            return items;
        }

        // Guest user
        const guestItems = [];

        if (showEventItems) {
            guestItems.push(
                {
                    label: <Link href={`/${eventSlug}/cart`}>Cart</Link>,
                    key: "0",
                    icon: (
                        <Badge count={cart.items.length} size="small">
                            <ShoppingCartOutlined />
                        </Badge>
                    ),
                },
                {
                    label: (
                        <Link href={`/${eventSlug}/search-order`}>
                            Search order
                        </Link>
                    ),
                    key: "1",
                    icon: <SearchOutlined />,
                },
                { type: "divider" },
            );
        }

        guestItems.push(
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
                        type="link"
                        onClick={() => onClick(false)}>
                        Sign up
                    </Button>
                ),
                icon: <UserAddOutlined />,
                key: "signUp",
            },
        );

        return guestItems;
    };

    return (
        <Dropdown
            style={{ cursor: "pointer" }}
            menu={{ items: getItems(), onClick }}
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
