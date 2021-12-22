import Head from 'next/head'
import Navbar from "../src/components/Navbar/Navbar";
import styles from '../styles/Home.module.scss';
import {useDispatch} from "react-redux";
import {updatePage} from "../store/reducers/navigation";
import {useEffect} from "react";
import Footer from "../src/components/Footer/Footer";

const User = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(updatePage(
            { name: 'User', href: '/user', current: true }
        ));
    })

    return (
        <div className={styles.container}>
            <Head>
                <title>Saso App | User</title>
                <meta name="description" content="Saso Application" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar/>
            <main className={styles.main}>
                <p>
                    {"I'm user page"}
                </p>
            </main>
            <Footer/>
        </div>
    );
};

export default User;