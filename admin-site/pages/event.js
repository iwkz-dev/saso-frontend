import Head from 'next/head'
import Navbar from "../src/components/Navbar/Navbar";
import styles from '../styles/Home.module.scss'
import {useDispatch} from "react-redux";
import {updatePage} from "../store/reducers/navigation";
import {useEffect} from "react";
import Footer from "../src/components/Footer/Footer";

const Event = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(updatePage(
            { name: 'Event', href: '/event', current: true }
        ));
    })

    return (
        <div className={styles.container}>
            <Head>
                <title>Saso App | Event</title>
                <meta name="description" content="Saso Application" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar/>
            <main className={styles.main}>
                <p>
                    test
                </p>
            </main>
            <Footer/>
        </div>
    );
};

export default Event;