import { Button, Card, Image, Space, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { addOrder } from '../../../../stores/reducers/cart';
import { isAuth } from '../../../../helpers/authHelper';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(addOrder(product));
  };
  const { Meta } = Card;

  return (
    <Card
      hoverable
      style={{
        width: 240,
      }}
      cover={
        <Image
          alt={product.name}
          height={200}
          src={
            product.images[0]?.imageUrl || 'https://via.placeholder.com/240x200'
          }
        />
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
          onClick={handleClick}
          shape="round"
        >
          Add to cart
        </Button>
      </Space>
    </Card>
  );
};

export default ProductItem;
