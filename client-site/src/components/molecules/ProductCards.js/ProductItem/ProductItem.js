import { Button, Card, Space, Typography, message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../../../../stores/reducers/cart";
import ImagesPreview from "../../../atoms/ImagesPreview/ImagesPreview";
import Router from "next/router";
import style from "./ProductItem.module.scss";

const ProductItem = ({ product }) => {
    const dispatch = useDispatch();
    const events = useSelector((state) => state.event.data);
    const { Meta } = Card;

    const handleClick = (e) => {
        e.stopPropagation();
        message.success(product.name + " Added");
        dispatch(addOrder(product));
    };

    const productPreview = () => {
        Router.push(`/product/${product._id}`);
    };

    return (
        <Card
            className={style.productItem}
            hoverable
            cover={
                <ImagesPreview
                    height={200}
                    productName={product.name}
                    productImages={product.images}
                />
            }>
            <div className={style.cardBody} onClick={productPreview}>
                <Space direction="vertical">
                    <Meta
                        title={product.name}
                        description={
                            product.quantity == product.quantityOrder
                                ? "Sold out"
                                : `Left Stock: ${
                                      product.quantity - product.quantityOrder
                                  }`
                        }
                    />
                    <Typography.Text style={{ fontSize: "1.5rem" }}>
                        {product.price} €
                    </Typography.Text>
                    <Button
                        type="primary"
                        disabled={
                            product.quantity == product.quantityOrder ||
                            events[0].po_closed
                        }
                        onClick={(e) => handleClick(e)}
                        shape="round"
                        icon={<ShoppingCartOutlined />}>
                        Add to cart
                    </Button>
                </Space>
            </div>
        </Card>
    );
};

export default ProductItem;
