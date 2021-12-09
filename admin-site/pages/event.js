import Head from 'next/head'
import Navbar from "../src/components/Navbar/Navbar";
import styles from '../styles/home.module.scss'
import {useDispatch} from "react-redux";
import {updatePage} from "../store/reducers/navigation";
import {useEffect} from "react";

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
                    I'm event
                </p>
            </main>
        </div>
    );
};

export default Event;