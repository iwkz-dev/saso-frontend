import * as React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from './BasicCard.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder } from '../../stores/reducers/cart';

export default function BasicCard({ menu }) {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(addOrder(menu));
  };
  return (
    <Card className={styles.cardContainer}>
      <div className={styles.imageContainer}>
        {menu.images.length > 0 ? (
          <img className={styles.menuImage} src={menu.images[0].imageUrl} />
        ) : (
          <img
            className={styles.menuImage}
            src="https://via.placeholder.com/400x200"
          />
        )}
      </div>
      <div className={styles.contentContainer}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {menu.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {menu.description}
          </Typography>
          {menu.quantity == menu.quantityOrder ? (
            <Typography variant="body2" color="text.secondary">
              Sold Out
            </Typography>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Left Stock: {menu.quantity - menu.quantityOrder}
            </Typography>
          )}
          <Typography variant="h6" color="text.price">
            {menu.price} €
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="contained"
            onClick={handleClick}
            disabled={menu.quantity == menu.quantityOrder}
          >
            Add to Cart
          </Button>
        </CardActions>
      </div>
    </Card>
  );
}

BasicCard.propTypes = {
  menu: PropTypes.object,
}