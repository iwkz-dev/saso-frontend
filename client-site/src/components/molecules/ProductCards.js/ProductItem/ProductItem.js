import { Button, Card, Image, Space, Typography, message } from 'antd';
import { useDispatch } from 'react-redux';
import { addOrder } from '../../../../stores/reducers/cart';
import { isAuth } from '../../../../helpers/authHelper';
import { useState } from 'react';
import ImagesPreview from '../../ImagesPreview/ImagesPreview';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const { Meta } = Card;

  const handleClick = e => {
    e.stopPropagation();
    message.success(product.name + ' Added');
    dispatch(addOrder(product));
  };


  const productPreview = () => {
    console.log('test');
  };

  return (
    <Card
      hoverable
      style={{
        width: 240,
      }}
      onClick={productPreview}
      cover={
        <ImagesPreview productName={product.name} productImages={product.images}/>
      }
    >
      <Space direction="vertical">
        <Meta title={product.name} />
        {product.quantity == product.quantityOrder ? (
          <Typography.Text>Sold Out</Typography.Text>
        ) : (
          <Typography.Text>
            Left Stock: {product.quantity - product.quantityOrder}
          </Typography.Text>
        )}
        <Typography.Title level={3} type="danger">
          {product.price} €
        </Typography.Title>
        <Button
          type="primary"
          disabled={product.quantity == product.quantityOrder || !isAuth()}
          onClick={e => handleClick(e)}
          shape="round"
        >
          Add to cart
        </Button>
      </Space>
    </Card>
  );
};

export default ProductItem;
