import "../styles/globals.scss";
import React from "react";
import { Provider } from "react-redux";
import { persistor, store } from "../stores/store";

import NProgress from "nprogress";
import Router from "next/router";
import Head from "next/head";
import { PersistGate } from "redux-persist/integration/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function MyApp({ Component, pageProps }) {
    Router.onRouteChangeStart = () => {
        NProgress.start();
    };
    Router.onRouteChangeComplete = () => NProgress.done();
    Router.onRouteChangeError = () => NProgress.done();
    const paypalClientId = process.env.PAYPAL_CLIENT_ID;

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <PayPalScriptProvider
                    options={{
                        clientId: paypalClientId,
                        currency: "EUR",
                        intent: "capture",
                    }}>
                    <Head>
                        <title>IWKZ E-Commerce</title>
                        <meta name="description" content="Saso Application" />
                        <link rel="icon" href="/favicon.ico" />
                        <link
                            rel="stylesheet"
                            href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
                        />
                        <meta
                            name="viewport"
                            content="width=device-width, initial-scale=1"
                        />
                    </Head>
                    <Component {...pageProps} />
                </PayPalScriptProvider>
            </PersistGate>
        </Provider>
    );
}

export default MyApp;
