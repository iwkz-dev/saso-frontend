import Head from 'next/head'
import Navbar from "../src/components/Navbar/Navbar";
import styles from '../styles/home.module.scss'
import {useDispatch} from "react-redux";
import {updatePage} from "../store/reducers/navigation";
import {useEffect} from "react";

const Index = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(updatePage(
            { name: 'Dashboard', href: '/', current: true }
        ));
    })

    return (
        <div className={styles.container}>
            <Head>
                <title>Saso App | Dashboard</title>
                <meta name="description" content="Saso Application" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar/>
            <main className={styles.main}>
                <p>
                    Welcome to SASO APP
                </p>
            </main>
        </div>
    );
};

export default Index;