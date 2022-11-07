import React from 'react';
import PropTypes from 'prop-types';
import BasicCard from '../BasicCard';
import styles from './CardCollection.module.scss';

const CardCollection = ({ menuList }) => {
  return (
    <div className={styles.container}>
      {menuList.map((element, i) => (
        <BasicCard key={i} menu={element} />
      ))}
    </div>
  );
};

CardCollection.propTypes = {
  menuList: PropTypes.array,
}
export default CardCollection;
