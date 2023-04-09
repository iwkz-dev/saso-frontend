import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs } from 'antd';
import { getAllCategories } from '../../../stores/reducers/category';
import ProductCards from '../ProductCards.js/ProductCards';

const TabsComponent = ({ event }) => {
  const dispatch = useDispatch();
  const category = useSelector(state => state.category);

  useEffect(() => {
    const filter = `?event=${event._id}`;
    dispatch(getAllCategories(filter));
  }, []);

  const items = [
    ...category.data.map((c, i) => {
      if (c.menus.data.length > 0) {
        return {
          key: i + 1,
          label: c.name,
          children: <ProductCards productList={c.menus.data} />,
        };
      }
    }),
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
};

export default TabsComponent;
