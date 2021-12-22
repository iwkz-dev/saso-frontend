import Head from 'next/head'
import Navbar from "../src/components/Navbar/Navbar";
import MenuTables from "../src/components/Tables/MenuTables";
import styles from '../styles/home.module.scss';
import {useDispatch} from "react-redux";
import {updatePage} from "../store/reducers/navigation";
import {useEffect} from "react";

const Menu = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(updatePage(
            { name: 'Menu', href: '/menu', current: true }
        ));
    })

    return (
        <div className={styles.container}>
            <Head>
                <title>Saso App | Menu</title>
                <meta name="description" content="Saso Application" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar/>
            <main className={styles.main}>
                <MenuTables/>
            </main>
        </div>
    );
};

export default Menu;