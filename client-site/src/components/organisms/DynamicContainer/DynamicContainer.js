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

const DynamicContainer = ({ event }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isBreakpoint = useMediaQuery(parseInt(styles.breakpointTablet));
  const [showCheckOrder, setShowCheckOrder] = useState(false);
  const [openOrder, setOpenOrder] = useState(false);
  const [showUserFormOrder, setShowUserFormOrder] = useState(false);
  const [mobileActive, setMobileActive] = useState(false);
  const menu = useSelector(state => state.menu.data);
  const category = useSelector(state => state.category);

  useEffect(() => {
    const filter = `?event=${event._id}`;
    dispatch(getAllCategories(filter));
  }, []);

  useEffect(() => {
    setMobileActive(false);
  }, [isBreakpoint]);

  useEffect(() => {
    if (openOrder) {
      if (isAuth()) {
        setShowCheckOrder(true);
        setShowUserFormOrder(false);
      } else {
        setShowCheckOrder(false);
        setShowUserFormOrder(true);
      }
    } else {
      setShowCheckOrder(false);
      setShowUserFormOrder(false);
    }
  }, [openOrder, isAuth()]);

  return (
    <div className={styles.dynamicContainer}>
      {showCheckOrder ? (
        <CheckOrder setOpenOrder={setOpenOrder} />
      ) : (
        <>
          <div className={styles.firstBlock}>
            <div className={styles.firstInnerContainer}>
              {showUserFormOrder ? (
                <UserFormOrder setOpenOrder={setOpenOrder} />
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
              Cart
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
