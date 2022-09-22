import Head from "next/head";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Router from "next/router";
import Navbar from "../../common/Navbar/Navbar";
import styles from "../../../../styles/Home.module.scss";
import { updatePage } from "../../../store/reducers/navigationReducer";
import Footer from "../../common/Footer/Footer";
import { isAuth } from "../../../helpers/authHelper";

function LoggedInLayout({ pageData, children, title, isNotAllowed }) {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isAuth()) {
            Router.push("/login");
        } else {
            dispatch(updatePage(pageData));
        }

        if (isNotAllowed) {
            Router.back();
        }
    }, []);

    if (!isAuth() || isNotAllowed) {
        return "";
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>{title}</title>
                <meta name="description" content="Saso Application" />
                <link rel="icon" href="/admin/favicon.ico" />
            </Head>
            <Navbar />
            <main className={`${styles.main} w-full mx-20`}>{children}</main>
            <Footer />
        </div>
    );
}

export default LoggedInLayout;
