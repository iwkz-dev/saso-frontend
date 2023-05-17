import { isAuth, logout } from "../../../helpers/authHelper";
import { Layout, Row, Col, Dropdown, Button, Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Link from "next/link";
import {
    LogoutOutlined,
    UserOutlined,
    HistoryOutlined,
} from "@ant-design/icons";
import LoginModal from "../../molecules/LoginModal/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../../../stores/reducers/cart";

const Navbar = () => {
    const cart = useSelector((state) => state.cart.data);
    const dispatch = useDispatch();
    const { Header } = Layout;

    const onClick = ({ key }) => {
        if (key === "2") {
            dispatch(resetCart());
            logout();
        }
    };

    const items = [
        {
            label: <Link href="/my-order">My Order</Link>,
            key: "0",
            icon: <HistoryOutlined />,
        },
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
            label: <div>Logout</div>,
            key: "2",
            icon: <LogoutOutlined />,
        },
    ];

    return (
        <Header
            style={{
                backgroundColor: "#ffffff",
                borderBottom: "1px solid rgba(149, 157, 165, 0.2)",
                position: "sticky",
                top: 0,
                zIndex: 1,
                paddingRight: "1rem",
                paddingLeft: "1rem",
            }}
        >
            <Row
                justify="space-between"
                style={{
                    maxWidth: "1024px",
                    margin: "auto",
                }}
            >
                <Col
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "3rem",
                        cursor: "pointer",
                    }}
                >
                    <Link href="/">
                        <img
                            style={{ width: "100%" }}
                            src="/images/iwkz_logo.png"
                            alt="iwkz logo"
                        />
                    </Link>
                </Col>
                <Col style={{ textAlign: "right" }}>
                    {isAuth() ? (
                        <Dropdown
                            style={{ cursor: "pointer" }}
                            menu={{
                                items,
                                onClick,
                            }}
                            trigger={["click"]}
                        >
                            <Badge count={cart.items.length}>
                                <Button
                                    shape="circle"
                                    icon={<UserOutlined />}
                                />
                            </Badge>
                        </Dropdown>
                    ) : (
                        <LoginModal />
                    )}
                </Col>
            </Row>
        </Header>
    );
};
export default Navbar;
