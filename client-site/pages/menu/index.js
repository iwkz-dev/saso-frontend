import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllMenu} from "../../src/redux/actions/CustomerMenuAction";
import {wrapper} from "../../src/redux/store";
import {motion, AnimatePresence} from "framer-motion";

import MenuCard from "../../src/components/MenuCard/MenuCard";
import CartItems from "../../src/components/CartItems/CartItems";
import Filter from "../../src/components/Filter/Filter";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import styles from "../../styles/menu.module.scss";

export default function Index()  {
    const getMenu = useSelector((state) => state.allCustomerMenu.menu);
    const getCartItems = useSelector((state) => state.allCustomerMenu.cartItems);
    const getTotalCartPrice = `${getCartItems.reduce((acc, cartItem) => acc + cartItem.price * cartItem.quantity, 0).toFixed(2)}€`
    const [allMenu, setAllMenu] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [activeMenu, setActiveMenu] = useState("");
    useEffect(() => {
        setAllMenu(getMenu);
        setFiltered(getMenu);
    },[]);
    return (
        <div className={styles.wrapper}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={7} className={styles.leftContentWrapper}>
                        <div className={styles.filterWrapper}>
                            <Filter allMenu={allMenu} setFiltered={setFiltered} activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>
                        </div>
                        <div>
                            {
                                <motion.div layout className={styles.menuCardWrapper}>
                                    <AnimatePresence>
                                            {filtered.map(menu => (
                                                <MenuCard key={menu._id} menu={menu}/>
                                            ))}
                                    </AnimatePresence>
                                </motion.div>
                            }
                        </div>
                    </Grid>
                    <Grid item xs={5} className={styles.rightContentWrapper}>
                        <div className={styles.cartWrapper}>
                            <div className={styles.titleWrapper}>
                                <span>Keranjang Belanja</span>
                            </div>
                            <div className={styles.itemWrapper}>
                                {
                                    getCartItems.map(cartItem => (
                                        <CartItems key={cartItem._id} cartItem={cartItem}/>
                                    ))
                                }
                            </div>
                            <div className={styles.priceWrapper}>
                                <span>Total Belanja:</span>{getTotalCartPrice}
                            </div>
                            <div className={styles.detailsWrapper}>
                                <Button
                                    // onClick={}
                                    variant="contained"
                                    size="large"
                                >
                                    Daftar & Pesan
                                </Button>
                                <div className={styles.detailsText}>
                                    <ul>
                                        <li><span>Pembayaran maksimal H + 1</span></li>
                                        <li><span>Pesanan yang sudah dibayar tidak bisa dibatalkan</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req }) => {
    await store.dispatch(getAllMenu(req))
})
