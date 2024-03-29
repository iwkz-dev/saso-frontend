import { Provider } from "react-redux";
import store from "../src/store/store";
import "../styles/globals.scss";
import NProgress from "nprogress";
import Router from "next/router";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
    Router.onRouteChangeStart = () => {
        NProgress.start();
    };
    Router.onRouteChangeComplete = () => NProgress.done();
    Router.onRouteChangeError = () => NProgress.done();

    return (
        <Provider store={store}>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
                />
                <meta name="description" content="Saso Application" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1"
                />
                <link rel="icon" href="/admin/favicon.ico" />
            </Head>
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;
