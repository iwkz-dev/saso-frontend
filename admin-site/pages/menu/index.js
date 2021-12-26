import Head from 'next/head'
import Navbar from "../../src/components/Navbar/Navbar";
import MenuTables from "../../src/components/Tables/MenuTables";
import styles from '../../styles/Home.module.scss';
import {useDispatch} from "react-redux";
import {updatePage} from "../../src/store/reducers/navigation";
import {useEffect} from "react";
import Footer from "../../src/components/Footer/Footer";

const Index = () => {
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
            <main className={`${styles.main} w-full mx-20`}>
                <MenuTables/>
            </main>
            <Footer/>
        </div>
    );
};

export default Index;