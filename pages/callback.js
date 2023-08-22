import {useEffect} from 'react'
import _ from 'lodash'
import Cookie from 'js-cookie'
import {useDispatch} from 'react-redux'

import Head from 'next/head'
import { useRouter } from 'next/navigation'

import request from '@lib/request'
import cookieName from '@/src/lib/cookie-key'

import { setProfile } from '@store/reducers/profile'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

export default function Callback(props) {

	const {query} = props

const router = useRouter()
const dispatch = useDispatch()

	useEffect(() => {

		if (!_.isEmpty(_.trim(query.msg))) {
			router.push(`/auth?msg=${encodeURIComponent(query.msg)}&type=${encodeURIComponent(query.type)}`)
		} else if (!_.isEmpty(_.trim(query.token))) {
			request.get('profile', {headers: {Authorization: `Bearer ${query.token}`}})
				.then(response => dispatch(setProfile(response.data)))
				.then(() => Cookie.set(cookieName, query.token))
				.then(() => router.push('/'))
				.catch(err => {
					console.error(err.toString())
				})
		}

	}, [query])

	return (
		<>
			<Head>
				<title>Verify Auth | My Assignment</title>
				<meta name="description" content="Verify Auth | My Assignment"/>
			</Head>
			<div>
				<Container>
					<Typography variant={'h5'} sx={{mt: 2, mb: 2}} align={'center'}>
						Validating your login. Please wait
					</Typography>
				</Container>
			</div>
		</>
	)
}

export const getServerSideProps = async (ctx) => {
	const {query, req} = ctx

  const destination = `/auth?msg=${encodeURIComponent('Invalid method')}&type=${encodeURIComponent('error')}`

	try {
		const {method} = req

		if (method !== 'POST') {
      return {redirect: {destination}}
		}

    return {props: {query}}
	} catch (err) {
    return {redirect: {destination}}
	}

}
