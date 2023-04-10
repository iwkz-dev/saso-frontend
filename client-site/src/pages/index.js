import React, { useEffect, useState } from 'react';
import { getEvent } from '../stores/reducers/event';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from 'antd';
import TokoContent from '../components/organisms/TokoContent/TokoContent';
import SasoContent from '../components/organisms/SasoContent/SasoContent';
import MainLayout from '../components/organisms/MainLayout/MainLayout';

export default function Home() {
  const dispatch = useDispatch();
  const [openOrderList, setOpenOrderList] = useState(false);
  const [openOrder, setOpenOrder] = useState(false);
  const { Header, Footer, Sider, Content } = Layout;

  //TODO fetch current event
  const events = useSelector(state => state.event.data);

  useEffect(() => {
    const status = 'approved';
    dispatch(getEvent(status));
  }, []);

  const ContentComponent = event => {
    if (process.env.EVENT_TYPE === 'toko') {
      return <TokoContent event={event} />;
    } else {
      return <SasoContent event={event} />;
    }
  };

  return (
    <MainLayout>{events[0] ? ContentComponent(events[0]) : null}</MainLayout>
  );
}
