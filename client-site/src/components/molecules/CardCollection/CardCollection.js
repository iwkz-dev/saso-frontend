import React from 'react';
import BasicCard from '../../atoms/BasicCard/BasicCard';
import styles from './CardCollection.module.scss';

const CardCollection = ({ menuList }) => {
  return (
    <div className={styles.container}>
      {menuList.map(element => (
        <BasicCard menu={element} />
      ))}
    </div>
  );
};

export default CardCollection;
