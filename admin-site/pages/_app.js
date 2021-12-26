import 'tailwindcss/tailwind.css'
import store from '../src/store/store';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </>
    );
}

export default MyApp
