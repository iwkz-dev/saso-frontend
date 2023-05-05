import { Card, Space } from 'antd';
import ProductItem from './ProductItem/ProductItem';

const ProductCards = ({ productList }) => {
  const { Meta } = Card;
  return (
    <Space wrap size={[24, 32]}>
      {productList.map(product => (
        <ProductItem key={product.name} product={product} />
      ))}
    </Space>
  );
};

export default ProductCards;
