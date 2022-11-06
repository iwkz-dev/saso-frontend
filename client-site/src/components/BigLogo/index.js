import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Container from '@mui/material/Container';
import styles from './biglogo.module.scss';
import { getEvent } from '../../stores/reducers/event';

const BigLogo = () => {
  const dispatch = useDispatch();

  const events = useSelector(state => state.event.data);

  useEffect(() => {
    const status = 'approved';
    dispatch(getEvent(status));
  }, []);

  return (
    <Container maxWidth="false" className={styles.container} disableGutters>
      {events.length > 0 ?
        <Box className={styles.box} sx={{ height: '25vh' }}>
          <img src={events[0]?.images[0]?.imageUrl} />
        </Box>
        :
        <Skeleton height={500} sx={{ marginTop: "-6.5em" }} />
      }
    </Container>
  );
};

export default BigLogo;
