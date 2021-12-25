import React from "react"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Image from "next/image"
import styles from "./biglogo.module.scss"
const BigLogo = () => {
  return (
    <Container maxWidth="false" disableGutters>
      <Box sx={{ bgcolor: "#cfe8fc", height: "25vh" }}>
        {/* <Image src /> */}
      </Box>
    </Container>
  )
}

export default BigLogo
