import '../styles/globals.scss';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import theme from '../theme';
import store from '../stores/store';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Layout>
          <CssBaseline />
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp;
