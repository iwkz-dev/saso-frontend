import React, { ReactElement, useState, useCallback, useEffect } from "react"
import styles from "./dynamicContainer.module.scss"
import Tabs from "../../molecules/Tabs/Tabs"
import Cart from "../../molecules/Cart/Cart"

const useMediaQuery = width => {
  const [targetReached, setTargetReached] = useState(true)

  const updateTarget = useCallback(e => {
    if (e.matches) {
      setTargetReached(true)
    } else {
      setTargetReached(false)
    }
  }, [])

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width - 1}px)`)
    media.addListener(updateTarget)

    // Check on mount (callback is not called until a change occurs)
    if (!media.matches) {
      setTargetReached(false)
    }

    return () => media.removeListener(updateTarget)
  }, [])

  return targetReached
}
const DynamicContainer = () => {
  const isBreakpoint = useMediaQuery(parseInt(styles.breakpointXS))
  return (
    <div className={styles.dynamicContainer}>
      <div className={styles.firstBlock}>
        <div className={styles.firstInnerContainer}>
          <Tabs />
        </div>
      </div>
      <div className={styles.secondBlock}>
        <div className={styles.secondInnerBlock}>
          <Cart />
        </div>
      </div>
    </div>
  )
}

export default DynamicContainer
