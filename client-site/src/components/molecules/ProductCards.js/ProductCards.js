import { Card } from 'antd';
import ProductItem from './ProductItem/ProductItem';

const ProductCards = ({ productList }) => {
  const { Meta } = Card;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '1.75rem',
        flexWrap: 'wrap',
      }}
    >
      {productList.map(product => (
        <ProductItem key={product.name} product={product} />
      ))}
    </div>
  );
};

export default ProductCards;
