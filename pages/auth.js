import Head from 'next/head'
import Script from 'next/script'

import {styled} from '@mui/material/styles'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'

const StyledDiv = styled(Box)`
  
`

export default function Auth(props) {

  const {client_id: clientId, redirect_uri: redirectUri} = props

  return (
    <>
      <Head>
        <title>Auth | My Assignment</title>
        <meta name="description" content="Auth  | My Assignment" />
      </Head>
      <StyledDiv sx={{mt: 4}}>

        <Grid container>
          <Grid smOffset={5}>
            <div>
              <div id="g_id_onload"
                   data-client_id={clientId}
                   data-context="signin"
                   data-ux_mode="redirect"
                   data-login_uri={redirectUri}
                   data-auto_prompt="false">
              </div>

              <div className="g_id_signin"
                   data-type="standard"
                   data-shape="rectangular"
                   data-theme="outline"
                   data-text="signin_with"
                   data-size="large"
                   data-logo_alignment="left">
              </div>
            </div>
          </Grid>
        </Grid>

        <Script src="https://accounts.google.com/gsi/client" />
      </StyledDiv>
    </>
  )
}

export const getServerSideProps = async () => {

  return {
    props: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI
    }
  }
}
