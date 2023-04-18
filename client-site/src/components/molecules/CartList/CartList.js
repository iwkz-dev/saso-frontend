import { Button, Card, Space, Typography } from 'antd';
import React from 'react';
import ImagesPreview from '../ImagesPreview/ImagesPreview';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './CartList.module.scss';

const CartList = ({ cart, add, remove }) => {
  return (
    <div className={styles.cartList}>
      <Space direction="vertical" style={{ width: '100%' }}>
        {cart.items.map((item, i) => (
          <Card key={i} size="small" style={{ width: '100%' }}>
            <div className={styles.cartItem}>
              <div className={styles.itemDescription}>
                <ImagesPreview
                  height={80}
                  productName={item.menu.name}
                  productImages={item.menu.images}
                />
                <Space direction="vertical">
                  <Typography.Text strong style={{ fontSize: '1.1rem' }}>
                    {item.menu.name}
                  </Typography.Text>
                  <Typography.Text>{item.menu.price} €</Typography.Text>
                </Space>
              </div>
              <div className={styles.itemAmount}>
                <Button
                  size="small"
                  shape="circle"
                  icon={<MinusOutlined />}
                  onClick={() => remove(item.menu)}
                />
                <Typography.Text>{item.amount}</Typography.Text>
                <Button
                  size="small"
                  shape="circle"
                  icon={<PlusOutlined />}
                  onClick={() => add(item.menu)}
                />
              </div>
            </div>
          </Card>
        ))}
      </Space>
    </div>
  );
};

export default CartList;
