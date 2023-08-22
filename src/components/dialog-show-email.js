import {useEffect, useState} from 'react'
import Cookie from 'js-cookie'

import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'

import request from '@lib/request'
import cookieName from '@lib/cookie-key'


export default function DialogShowEmail(props) {

	const {id, onClose} = props

	const [data, setData] = useState({})

	useEffect(() => {

		request.get(`users/${id}`, {headers: {Authorization: Cookie.get(cookieName)}})
			.then(response => setData(response.data))
			.catch(err => {
				// @todo handle error
				console.error(err.toString())
			})

	}, [id])

	return (
		<Dialog open={true} onClose={onClose} fullWidth maxWidth={'sm'}>
			<DialogContent sx={{p: 0}}>
				<Card sx={{display: 'flex'}}>
					<CardMedia
						component="img"
						sx={{flexGrow: 1, maxWidth: 130, minHeight: 136}}
						image={data.avatar}
						alt="User"/>
					<Box sx={{display: 'flex', flexGrow: 1, flexDirection: 'column'}}>
						<CardContent sx={{flex: '1 0 auto'}}>
							<Typography component="div" variant="h5">
								{data.email}
							</Typography>
							<Typography variant="subtitle1" color="text.secondary" component="div">
								{data.first_name}, {data.last_name}
							</Typography>
						</CardContent>
						<Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pl: 1, pb: 1, pr: 2}}>
							<Button variant={'text'} onClick={onClose} color={'inherit'}>Close</Button>
						</Box>
					</Box>
				</Card>
			</DialogContent>
		</Dialog>
	)
}