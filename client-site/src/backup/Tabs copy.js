import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import styles from './tabs.module.scss';
import CardCollection from '../CardCollection/CardCollection';
import { getAllCategories } from '../../../stores/reducers/category';
import { useRouter } from 'next/router';

export default function Tabs({ event }) {
  const dispatch = useDispatch();
  const category = useSelector(state => state.category);

  const [value, setValue] = useState('0');

  useEffect(() => {
    const filter = `?event=${event._id}`;
    dispatch(getAllCategories(filter));
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={styles.tabsContainer}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList
            onChange={handleChange}
            aria-label="tabs"
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
          >
            {category.data.map((c, i) => (
              <Tab key={c._id} label={c.name} value={i.toString()} />
            ))}
          </TabList>
        </Box>
        {category.data.map((c, i) => (
          <TabPanel key={c._id} value={i.toString()}>
            <CardCollection menuList={c.menus.data} />
          </TabPanel>
        ))}
      </TabContext>
    </div>
  );
}
