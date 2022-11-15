import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Tabs from '../Tabs';
import Cart from '../Cart';
import Login from '../LoginModal'
import CheckOrder from '../CheckOrder';

import { isAuth } from '../../helpers/authHelper';
import styles from './menu.module.scss';

const Menu = ({
  event,
}) => {
  const [openOrderList, setOpenOrderList] = useState(false);
  const [openOrder, setOpenOrder] = useState(false);
  const isBreakpoint = useMediaQuery(parseInt(styles.breakpointTablet));
  const [mobileActive, setMobileActive] = useState(false);
  const cart = useSelector(state => state.cart.data);
  // ! LOGIN MODAL
  const [openLogin, setOpenLogin] = useState(false);
  const handleOpenLogin = () => setOpenLogin(true);
  const onHandleCheckout = () => {
    if (isAuth()) {
      setOpenOrder(true)
    } else {
      setOpenLogin(true)
    }
  }

  useEffect(() => {
    setMobileActive(false);
  }, [isBreakpoint]);

  return (
    <div className={styles.dynamicContainer}>
      <CheckOrder
        openOrder={openOrder}
        setOpenOrder={setOpenOrder}
        setOpenOrderList={setOpenOrderList}
      />
      <Login open={openLogin} setOpen={setOpenLogin} />

      <div className={styles.firstBlock}>
        <div className={styles.firstInnerContainer}>
          <Tabs event={event} />
        </div>
      </div>

      <div className={styles.secondBlock}>
        <div
          className={`${styles.secondInnerBlock} ${mobileActive && styles.active
            }`}
        >
          <Cart
            isBreakpoint={isBreakpoint}
            setMobileActive={setMobileActive}
            openOrder={openOrder}
            setOpenOrder={onHandleCheckout}
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

      {/* OLD SYSTEM */}
      {/* {showCheckOrder ? (
        <CheckOrder
          openOrder={openOrder}
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
                <>
                  <Button
                    variant="outlined"
                    onClick={handleOpenLogin}
                  >
                    Login
                  </Button>
                  <Login open={openLogin} setOpen={setOpenLogin} />
                </>
              ) : (
                <Tabs event={event} />
              )}
            </div>
          </div>
          <div className={styles.secondBlock}>
            <div
              className={`${styles.secondInnerBlock} ${mobileActive && styles.active
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
      )} */}
    </div>
  );
};

Menu.propTypes = {
  event: PropTypes.object,
}

export default Menu;

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
