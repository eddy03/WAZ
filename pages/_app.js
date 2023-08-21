import Head from 'next/head'

import '@/styles/globals.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme()

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
