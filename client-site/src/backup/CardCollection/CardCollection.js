import React from "react";
import BasicCard from "../../atoms/BasicCard/BasicCard";
import styles from "./CardCollection.module.scss";

const CardCollection = ({ menuList }) => {
    return (
        <div className={styles.container}>
            {menuList.map((element, i) => (
                <BasicCard key={i} menu={element} />
            ))}
        </div>
    );
};

export default CardCollection;
