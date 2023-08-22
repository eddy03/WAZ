import {useEffect} from 'react'
import {useSelector} from 'react-redux'
import _ from 'lodash'

import Head from 'next/head'
import {useRouter} from 'next/navigation'

import Typography from '@mui/material/Typography'

import Wrapper from '@comp/wrapper'

export default function Callback(props) {

	const router = useRouter()
	const {me} = useSelector(state => state.profile)

	useEffect(() => {
		if (_.isEmpty(me)) {
			router.push(`/auth?bck=${encodeURIComponent('/account')}`)
		}

	}, [])

	return (
		<>
			<Head>
				<title>My account | My Assignment</title>
				<meta name="description" content="My account | My Assignment"/>
			</Head>
			<Wrapper>
				<Typography variant={'h5'} sx={{mt: 2, mb: 2}} align={'center'}>
					Here we display your account information
				</Typography>
			</Wrapper>
		</>
	)
}

export const getServerSideProps = async (ctx) => {
	const {query, req} = ctx

	return {props: {}}
}
