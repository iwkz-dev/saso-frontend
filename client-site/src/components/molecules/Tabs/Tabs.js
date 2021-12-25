import * as React from "react"
import Box from "@mui/material/Box"
import Tab from "@mui/material/Tab"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
import styles from "./tabs.module.scss"

export default function LabTabs() {
  const [value, setValue] = React.useState("1")

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className={styles.tabsContainer}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="tabs"
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
          >
            <Tab label="Makanan Ringan" value="1" />
            <Tab label="Makanan Utama" value="2" />
            <Tab label="Minuman" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">Makanan Ringan</TabPanel>
        <TabPanel value="2">Makanan Utama</TabPanel>
        <TabPanel value="3">Minuman</TabPanel>
      </TabContext>
    </div>
  )
}
