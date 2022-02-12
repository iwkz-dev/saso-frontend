import React, { useState, useCallback, useEffect } from 'react';
import styles from './dynamicContainer.module.scss';
import Tabs from '../../molecules/Tabs/Tabs';
import Cart from '../../molecules/Cart/Cart';
import { Button } from '@mui/material';
import sasoApi from '../../../api/SasoApi';
import { getMenu } from '../../../stores/reducers/menu';
import { useDispatch, useSelector } from 'react-redux';

const DynamicContainer = () => {
  const dispatch = useDispatch();
  const isBreakpoint = useMediaQuery(parseInt(styles.breakpointTablet));
  const [mobileActive, setMobileActive] = useState(false);
  const menu = useSelector(state => state.menu.data.menu);

  useEffect(() => {
    dispatch(getMenu());
  }, []);

  useEffect(() => {
    setMobileActive(false);
  }, [isBreakpoint]);
  const handleClick = async () => {
    const res = await sasoApi.getData('/customer/menu');
    console.log(res);
  };
  return (
    <div className={styles.dynamicContainer}>
      <Button onClick={handleClick} variant="contained">
        test API
      </Button>
      <div className={styles.firstBlock}>
        <div className={styles.firstInnerContainer}>
          <Tabs menu={menu} />
        </div>
      </div>
      <div className={styles.secondBlock}>
        <div
          className={`${styles.secondInnerBlock} ${
            mobileActive && styles.active
          }`}
        >
          <Cart />
        </div>
      </div>
      {isBreakpoint && (
        <Button
          variant="contained"
          className={styles.cartButton}
          onClick={() => setMobileActive(true)}
        >
          Cart
        </Button>
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
