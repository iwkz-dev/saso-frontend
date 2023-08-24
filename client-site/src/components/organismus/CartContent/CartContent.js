import { useDispatch, useSelector } from "react-redux";
import { Empty, Space } from "antd";
import CartList from "../../atoms/CartList/CartList";
import ContentLayout from "../ContentLayout/ContentLayout";
import CartSummary from "../../atoms/CartSummary/CartSummary";
import { addOrder, removeOrder } from "../../../stores/reducers/cart";
import styles from "./CartContent.module.scss";
import BackToButton from "../../atoms/BackToButton/BackToButton";

const CartContent = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.data);

    const add = (menu) => {
        dispatch(addOrder(menu));
    };

    const remove = (menu) => {
        dispatch(removeOrder(menu));
    };

    return (
        <ContentLayout className={styles.cartContent}>
            {cart.items.length <= 0 ? (
                <Empty />
            ) : (
                <Space
                    size="large"
                    direction="vertical"
                    style={{ width: "100%" }}>
                    <BackToButton targetURL="/" buttonText="Back to home" />
                    <div className={styles.Cart}>
                        <div className={styles.cartList}>
                            <CartList cart={cart} add={add} remove={remove} />
                        </div>
                        <div className={styles.cartSummary}>
                            <CartSummary cart={cart} title="Order Summary" />
                        </div>
                    </div>
                </Space>
            )}
        </ContentLayout>
    );
};

export default CartContent;
