import React from "react"
import styles from "./dynamicContainer.module.scss"
import Tabs from "../../molecules/Tabs/Tabs"
import Cart from "../../molecules/Cart/Cart"
const DynamicContainer = () => {
  return (
    <div className={styles.dynamicContainer}>
      <div className={styles.firstBlock}>
        <Tabs />
      </div>
      <div className={styles.secondBlock}>
        {" "}
        <Cart />
      </div>
    </div>
  )
}

export default DynamicContainer
