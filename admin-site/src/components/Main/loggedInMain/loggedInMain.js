import Head from "next/head";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Router from "next/router";
import Navbar from "../../Navbar/Navbar";
import styles from "../../../../styles/Home.module.scss";
import { updatePage } from "../../../store/reducers/navigation";
import Footer from "../../Footer/Footer";
import { isAuth } from "../../../helpers/auth";

function LoggedInMain({ pageData, children, title }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuth()) {
      Router.push("/login");
    } else {
      dispatch(updatePage(pageData));
    }
  });

  if (!isAuth()) {
    return "";
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Saso Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className={`${styles.main} w-full mx-20`}>{children}</main>
      <Footer />
    </div>
  );
}

export default LoggedInMain;
