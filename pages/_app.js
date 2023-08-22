import { Provider } from "react-redux";

import Head from 'next/head'

import '@/styles/globals.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline';

import { wrapper } from '@/src/store';

const theme = createTheme()

function App({ Component, ...rest }) {

  const {store, props} = wrapper.useWrappedStore(rest)

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://storage.googleapis.com/bizsaya-statics-assets/favicon.ico" type="image/x-icon" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <Component {...props.pageProps} />
        </Provider>
      </ThemeProvider>
    </>
  )
}

export default  wrapper.withRedux(App)
