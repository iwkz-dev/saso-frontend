import { Card, Space } from "antd";
import ProductItem from "./ProductItem/ProductItem";

const ProductCards = ({ productList, barcode }) => {
    const { Meta } = Card;
    return (
        <Space wrap size={[24, 32]}>
            {productList
                .filter((product) =>
                    barcode != "" ? product.barcode === barcode : true,
                )
                .map((product) => (
                    <ProductItem key={product.name} product={product} />
                ))}
        </Space>
    );
};

export default ProductCards;
