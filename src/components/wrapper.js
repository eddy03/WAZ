import React from 'react'
import {useSelector} from 'react-redux'

import {styled} from '@mui/material/styles'
import Box from '@mui/material/Box'

import Navbar from './navbar'
import Content from './content'
import Footer from './footer'

const StyledDiv = styled(Box)`
	min-height: 100vh;
  display: flex;
	flex-direction: column;
`

export default function Wrapper(props) {

	const {me} = useSelector(state => state.profile)

	return (
		<StyledDiv>
			<Navbar me={me} />
			<Content>
				{props.children}
			</Content>
			<Footer />
		</StyledDiv>
	)
}
