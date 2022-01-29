import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from './BasicCard.module.scss';
import Image from 'next/image';

export default function BasicCard({ menu }) {
  return (
    <Card sx={{ maxWidth: 345 }} className={styles.cardContainer}>
      <Image width={400} height={200} src="/images/spiderman.jpg" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {menu.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
