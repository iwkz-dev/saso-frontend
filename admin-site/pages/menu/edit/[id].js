import React from 'react';
import { useRouter } from 'next/router';
import Head from "next/head";
import Navbar from "../../../src/components/Navbar/Navbar";
import MenuForms from "../../../src/components/Forms/MenuForms";
import Footer from "../../../src/components/Footer/Footer";

import styles from "../../../styles/Home.module.scss";

const id = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    const { id } = router.query
    return (
        <div className={styles.container}>
            <Head>
                <title>Saso App | Menu</title>
                <meta name="description" content="Saso Application" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar/>
            <main className={`${styles.main} w-full mx-20`}>
                <MenuForms id={id}/>
            </main>
            <Footer/>
        </div>
    );
};

export default id;