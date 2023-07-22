import { Col, Row } from "antd";
import ProductItem from "./ProductItem/ProductItem";
import useWindowDimensions from "../../../hooks/windowsDimensions";
import { useEffect, useState } from "react";

const ProductCards = ({ productList }) => {
    const [sectionNumbers, setSectionNumber] = useState(4);
    const { width } = useWindowDimensions();

    useEffect(() => {
        if (width >= 1024) setSectionNumber(6);
        if (width >= 728 && width < 1024) setSectionNumber(8);
        if (width >= 375 && width < 728) setSectionNumber(12);
        if (width <= 375) setSectionNumber(24);
    }, [width]);

    return (
        <Row gutter={[16, 24]}>
            {productList.map((product) => (
                <Col span={sectionNumbers}>
                    <ProductItem key={product.name} product={product} />
                </Col>
            ))}
        </Row>
    );
};

export default ProductCards;
