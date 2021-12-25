import React from "react"
import BasicCard from "../../atoms/BasicCard/BasicCard"
import styles from "./CardCollection.module.scss"

const CardCollection = () => {
  return (
    <div className={styles.container}>
      <BasicCard />
      <BasicCard />
      <BasicCard />
    </div>
  )
}

export default CardCollection
