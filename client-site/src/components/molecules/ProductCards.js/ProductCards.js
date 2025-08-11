import { Row, Col } from "antd";
import ProductItem from "./ProductItem/ProductItem";

const ProductCards = ({ productList }) => {
    return (
        <Row
            gutter={[
                { xs: 8, sm: 12, md: 16, lg: 20, xl: 24 },
                { xs: 12, sm: 16, md: 20, lg: 24, xl: 28 },
            ]}
            wrap
        >
            {productList.map((product) => (
                <Col
                    key={product._id || product.name}
                    xs={24}
                    sm={12}
                    md={8}
                    lg={6}
                    xl={6}
                >
                    <div style={{ height: "100%" }}>
                        <ProductItem product={product} />
                    </div>
                </Col>
            ))}
        </Row>
    );
};

export default ProductCards;
