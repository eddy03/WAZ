import {useEffect, useRef} from 'react'
import _ from 'lodash'
import Cookie from 'js-cookie'
import {useDispatch} from 'react-redux'

import {useRouter} from 'next/navigation'
import Head from 'next/head'
import Script from 'next/script'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'
import Alert from '@mui/material/Alert'
import Typography from '@mui/material/Typography'

import cookieName from '@/src/lib/cookie-key'
import request from '@lib/request'
import Wrapper from '@comp/wrapper'
import {setProfile} from '@store/reducers/profile'

export default function Auth(props) {

	const {query, client_id: clientId, redirect_uri: redirectUri} = props

	const intervalRef = useRef(null)

	const router = useRouter()
	const dispatch = useDispatch()

	useEffect(() => {

		const token = Cookie.get(cookieName)
		if (!_.isEmpty(_.trim(token))) {
			request.get('profile', {headers: {Authorization: `Bearer ${token}`}})
				.then(response => dispatch(setProfile(response.data)))
				.then(() => router.push(!_.isEmpty(query.bck) ? query.bck : '/'))
				.catch(err => {
					// @todo handle error
					initilizeGoogleBtn()
				})
		} else {
			initilizeGoogleBtn()
		}

	}, [])

	function initilizeGoogleBtn() {
		if (window && intervalRef.current === null) {
			intervalRef.current = true
			intervalRef.current = setInterval(() => {
				if (!_.isEmpty(window.google) && _.has(window.google, 'accounts')) {
					const {google} = window

					clearInterval(intervalRef.current)
					google.accounts.id.initialize({
						client_id: clientId,
						login_uri: redirectUri,
						ux_mode: 'redirect',
						native_login_uri: null
					})

					const btn = document.getElementById('google_btn')
					if (btn) {
						google.accounts.id.renderButton(btn, {
							theme: 'filled_white',
							text: 'continue_with',
							click_listener: () => {
								console.log('Click')
							}
						})
					}

				}
			}, 300)
		}
	}

	return (
		<>
			<Head>
				<title>Auth | My Assignment</title>
				<meta name="description" content="Auth  | My Assignment"/>
			</Head>
			{
				!_.isEmpty(query.msg) && (
					<Alert severity={query.type || 'error'} onClose={() => router.replace('/auth')}>{query.msg}</Alert>
				)
			}
			<Wrapper withNavbar={false} withFooter={false}>
				<Typography variant={'h5'} sx={{mt: 2, mb: 2}} align={'center'}>
					Please sign in using your google account to continue using the service.
				</Typography>

				<Box sx={{mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<div id={'google_btn'}></div>
				</Box>
			</Wrapper>

			<Script src="https://accounts.google.com/gsi/client" async/>
		</>
	)
}

export const getServerSideProps = async (ctx) => {
	const {query} = ctx

	return {
		props: {
			query,
			client_id: process.env.GOOGLE_CLIENT_ID,
			redirect_uri: process.env.GOOGLE_REDIRECT_URI
		}
	}
}
