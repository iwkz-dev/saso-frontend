import { Button, Card, Space, Typography, message } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { addOrder } from '../../../../stores/reducers/cart';
import { isAuth } from '../../../../helpers/authHelper';
import { useState } from 'react';
import ImagesPreview from '../../ImagesPreview/ImagesPreview';
import { useRouter } from 'next/router';

const ProductItem = ({ product }) => {
  const router = useRouter();

  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const { Meta } = Card;

  const handleClick = e => {
    e.stopPropagation();
    message.success(product.name + ' Added');
    dispatch(addOrder(product));
  };

  function showDetailsHandler() {
    router.push('/item/view/' + product.id);
  }

  const productPreview = () => {
    showDetailsHandler
  };

  return (
    <Card
      hoverable
      style={{
        width: 220,
      }}
      onClick={showDetailsHandler}
      cover={
        <ImagesPreview
          productName={product.name}
          productImages={product.images}
        />
      }
    >
      <Space direction="vertical">
        <Meta
          title={product.name}
          description={
            product.quantity == product.quantityOrder
              ? 'Sold out'
              : `Left Stock: ${product.quantity - product.quantityOrder}`
          }
        />
        <Typography.Text style={{ fontSize: '1.5rem' }}>
          {product.price} €
        </Typography.Text>
        <Button
          type="primary"
          disabled={product.quantity == product.quantityOrder || !isAuth()}
          onClick={e => handleClick(e)}
          shape="round"
          icon={<ShoppingCartOutlined />}
        >
          Add to cart
        </Button>
      </Space>
    </Card>
  );
};

export default ProductItem;
