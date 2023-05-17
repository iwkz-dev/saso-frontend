import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Image from "next/image";
import styles from "./biglogo.module.scss";
const BigLogo = ({ event }) => {
    return (
        <Container maxWidth="false" className={styles.container} disableGutters>
            <Box className={styles.box} sx={{ height: "25vh" }}>
                {event ? <img src={event?.images[0]?.imageUrl} /> : ""}
            </Box>
        </Container>
    );
};

export default BigLogo;
