import {useEffect} from 'react'
import Cookie from 'js-cookie'
import _ from 'lodash'
import {useDispatch} from 'react-redux'

import Head from 'next/head'
import { useRouter } from 'next/navigation'

import cookieName from '@/src/lib/cookie-key'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import { clearProfile } from '@store/reducers/profile'

export default function Callback(props) {

	const router = useRouter()
	const dispatch = useDispatch()

	useEffect(() => {

		Cookie.remove(cookieName)
		dispatch(clearProfile())
		router.push(`/auth`)

	}, [])

	return (
		<>
			<Head>
				<title>Logging out | My Assignment</title>
				<meta name="description" content="Logging out | My Assignment"/>
			</Head>
			<div>
				<Container>
					<Typography variant={'h5'} sx={{mt: 2, mb: 2}} align={'center'}>
						Logging you out. Please wait
					</Typography>
				</Container>
			</div>
		</>
	)
}

export const getServerSideProps = async (ctx) => {
	const {req: {removeToken, cookies: {waz_t}}} = ctx

	if (!_.isEmpty(waz_t)) {
		removeToken(waz_t)
	}

	return {props: {}}

}
