import {useEffect} from 'react'
import Cookie from 'js-cookie'
import _ from 'lodash'
import {useDispatch} from 'react-redux'

import Head from 'next/head'
import {useRouter} from 'next/navigation'

import Typography from '@mui/material/Typography'

import cookieName from '@/src/lib/cookie-key'
import {clearProfile} from '@store/reducers/profile'
import Wrapper from '@comp/wrapper'

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
			<Wrapper withNavbar={false} withFooter={false}>
				<Typography variant={'h5'} sx={{mt: 2, mb: 2}} align={'center'}>
					Logging you out. Please wait
				</Typography>
			</Wrapper>
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
