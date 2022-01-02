import Head from 'next/head'
import Navbar from "../../../../src/components/Navbar/Navbar";
import styles from '../../../../styles/Home.module.scss';
import {useDispatch} from "react-redux";
import {updatePage} from "../../../store/reducers/navigation";
import {useEffect} from "react";
import Footer from "../../../../src/components/Footer/Footer";
import {isAuth} from "../../../helpers/auth";
import Router from "next/router";

const LoggedInMain = ({pageData, children, title}) => {
    const dispatch = useDispatch();

    useEffect(()=>{
        if(!isAuth()){
            Router.push('/login')
        }else{
            dispatch(updatePage(
                pageData
            ));
        }
    })

    if(!isAuth()){
        return("")
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>{title}</title>
                <meta name="description" content="Saso Application" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar/>
            <main className={`${styles.main} w-full mx-20`}>
                {children}
            </main>
            <Footer/>
        </div>
    );
};

export default LoggedInMain;