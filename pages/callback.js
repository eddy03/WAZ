import Head from 'next/head'
import {useEffect, useRef} from "react";
import Script from "next/script";
import Link from 'next/link'
import _ from 'lodash'

import Button from '@mui/material/Button'

export default function Callback(props) {

  const {client_id: clientId, redirect_uri: redirectUri} = props

  const intervalRef = useRef(null)

  useEffect(() => {

    if (window && intervalRef.current === null) {
      intervalRef.current = true
      intervalRef.current = setInterval(() => {
        if (!_.isEmpty(window.google) && _.has(window.google, 'accounts')) {
          clearInterval(intervalRef.current)
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: () => {
              console.log('arguments', arguments)
            }
          })



          // console.log(window.google.accounts.id.prompt())
          // console.log(window.google.accounts.oauth2.hasGrantedAllScopes())
        }
      }, 300)
    }

  }, [])

  return (
    <>
      <Head>
        <title>Verify Auth | My Assignment</title>
        <meta name="description" content="Verify Auth | My Assignment" />
      </Head>
      <div>

        <Link href={'/'}>
          <Button>Back to login</Button>
        </Link>

        <Script src="https://accounts.google.com/gsi/client" />
      </div>
    </>
  )
}

export const getServerSideProps = async (ctx) => {
  return {
    props: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI
    }
  }
}
