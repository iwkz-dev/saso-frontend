import { Provider } from "react-redux";
import store from "../src/store/store";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;
