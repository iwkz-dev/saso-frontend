import React from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import classes from '../../molecules/Products/ProductDetail.module.scss';
import { Row, Col, Typography, Descriptions, Button } from 'antd';



const { Text } = Typography;
const { Item } = Descriptions;

function ProductDetail(props) {
  return (
    <section 
      style={{
        display:"flex",
        justifyContent:'center'
      }}
    >
      <div>
        <div
          style={{
            margin:'10%',
            display:'flex',
            justifyContent:'space-around'
          }}
        >
          <img width="50%" src={props.image}></img>
          <div 
            style={{
              marginTop:'2%',
            }}
          >
          <Typography>
            <Typography.Title level={1} style={{ textAlign: 'center' }}>
              {props.name}
            </Typography.Title>
          </Typography>
          <div
            style={{
              marginLeft:'10%',
            }}
          >
          <Typography>
            <Typography.Title level={2}>
              Price:
            </Typography.Title>
            <Typography.Text style={{fontSize: '1.5rem'}}>
               {"€" + props.price}
            </Typography.Text>
          </Typography>
          <Typography>
            <Typography.Title level={2}>
              Description:
            </Typography.Title>
          </Typography>
          <p>{props.description}</p>
          <Button
            style={{
              marginTop:'5%',
            }}
            type="primary"
            onClick={e => handleClick(e)}
            shape="round"
            icon={<ShoppingCartOutlined />}
          >
          Add to cart
        </Button>
          </div>
        </div>
      </div>
      </div>
    </section>
    
  )
}

export default ProductDetail;