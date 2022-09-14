import React, { useState, useCallback, useEffect } from 'react';
import styles from './dynamicContainer.module.scss';
import Tabs from '../../molecules/Tabs/Tabs';
import UserFormOrder from '../../molecules/UserFormOrder/UserFormOrder';
import CheckOrder from '../../molecules/CheckOrder/CheckOrder';
import Cart from '../../molecules/Cart/Cart';
import { Button } from '@mui/material';
import { getAllCategories } from '../../../stores/reducers/category';
import { useDispatch, useSelector } from 'react-redux';
import { isAuth } from '../../../helpers/authHelper';
import { useRouter } from 'next/router';
import OrderList from '../../molecules/OrderList/OrderList';

const DynamicContainer = ({
  event,
  openOrderList,
  setOpenOrderList,
  openOrder,
  setOpenOrder,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isBreakpoint = useMediaQuery(parseInt(styles.breakpointTablet));
  const [showCheckOrder, setShowCheckOrder] = useState(false);
  const [showOrderList, setShowOrderList] = useState(false);
  const [showUserFormOrder, setShowUserFormOrder] = useState(false);
  const [mobileActive, setMobileActive] = useState(false);
  const menu = useSelector(state => state.menu.data);
  const category = useSelector(state => state.category);
  const cart = useSelector(state => state.cart);

  useEffect(() => {
    const filter = `?event=${event._id}`;

    dispatch(getAllCategories(filter));
  }, []);

  useEffect(() => {
    setMobileActive(false);
  }, [isBreakpoint]);

  useEffect(() => {
    if (openOrderList) {
      if (isAuth()) {
        setShowOrderList(true);
        setShowCheckOrder(false);
        setShowUserFormOrder(false);
      } else {
        setShowOrderList(false);
        setShowCheckOrder(false);
        setShowUserFormOrder(true);
      }
    } else if (openOrder) {
      if (isAuth()) {
        setShowCheckOrder(true);
        setShowOrderList(false);
        setShowUserFormOrder(false);
      } else {
        setShowCheckOrder(false);
        setShowOrderList(false);
        setShowUserFormOrder(true);
      }
    } else {
      setShowCheckOrder(false);
      setShowUserFormOrder(false);
      setShowOrderList(false);
    }
  }, [openOrder, isAuth(), openOrderList]);

  return (
    <div className={styles.dynamicContainer}>
      {showCheckOrder ? (
        <CheckOrder
          setOpenOrder={setOpenOrder}
          setOpenOrderList={setOpenOrderList}
        />
      ) : showOrderList ? (
        <OrderList setOpenOrderList={setOpenOrderList} event={event} />
      ) : (
        <>
          <div className={styles.firstBlock}>
            <div className={styles.firstInnerContainer}>
              {showUserFormOrder ? (
                <UserFormOrder
                  setOpenOrder={setOpenOrder}
                  setOpenOrderList={setOpenOrderList}
                />
              ) : (
                <Tabs category={category} menu={menu} />
              )}
            </div>
          </div>
          <div className={styles.secondBlock}>
            <div
              className={`${styles.secondInnerBlock} ${
                mobileActive && styles.active
              }`}
            >
              <Cart
                isBreakpoint={isBreakpoint}
                setMobileActive={setMobileActive}
                openOrder={openOrder}
                setOpenOrder={setOpenOrder}
              />
            </div>
          </div>
          {isBreakpoint && !mobileActive ? (
            <Button
              size="large"
              variant="contained"
              className={styles.cartButton}
              onClick={() => setMobileActive(true)}
            >
              Cart {cart.totalAmount == 0 ? '' : `(${cart.totalAmount})`}
            </Button>
          ) : (
            ''
          )}
        </>
      )}
    </div>
  );
};

export default DynamicContainer;

const useMediaQuery = width => {
  const [targetReached, setTargetReached] = useState(true);

  const updateTarget = useCallback(e => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width - 1}px)`);
    media.addEventListener('change', updateTarget);

    // Check on mount (callback is not called until a change occurs)
    if (!media.matches) {
      setTargetReached(false);
    }

    return () => media.removeEventListener('change', updateTarget);
  }, []);

  return targetReached;
};
