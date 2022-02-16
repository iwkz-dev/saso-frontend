import React from 'react';
import Image from 'next/image'
import {useDispatch, useSelector} from "react-redux";
import {addItemToCart} from "../../redux/actions/CustomerMenuAction";
import {motion} from "framer-motion";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import placeholder from "../../assets/placeholder.png";
import styles from "./MenuCard.module.scss";

const MenuCard = ({menu}) => {
    const dispatch = useDispatch();
    const addItem = (item) => {
        dispatch(addItemToCart(item));
    }
    return (
        <motion.div layout animate={{opacity: 1}} initial={{opacity: 0}} exit={{opacity: 0}}>
            <div className={styles.menuWrapper}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={2} className={styles.imageWrapper}>
                            {
                                menu.images.length === 0
                                    ?
                                    <Image
                                        alt="Placeholder"
                                        src={placeholder}
                                        width="150px"
                                        height="150px"
                                    />
                                    :
                                <img src={menu.images[0].imageUrl}/>
                            }
                        </Grid>
                        <Grid item xs={10} className={styles.detailsWrapper}>
                            <div className={styles.leftContent}>
                                <div className={styles.textWrapper}>
                                    <span className={styles.headlineTitle}>{menu.name}</span>
                                    <span className={styles.headlineDescription}>{menu.description}</span>
                                </div>
                                <div className={styles.priceContent}>
                                    <span className={styles.headlinePrice}>{menu.price}€</span>
                                    <span className={styles.stockQuantity}>sisa porsi: xxx</span> {/*still dummy! needs fetching from api*/}
                                </div>
                            </div>
                            <div className={styles.rightContent}>
                                <Button
                                    onClick={() => addItem(menu)}
                                    variant="contained"
                                    size="small"
                                    startIcon=
                                        {
                                            <AddShoppingCartIcon style={{ color: "#ffffff" }}/>
                                        }
                                >
                                Add to cart
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </motion.div>
    );
};

export default MenuCard;
