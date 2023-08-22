import React from 'react'

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

	const {withNavbar = true, withFooter = true} = props

	return (
		<StyledDiv>
			{
				withNavbar && <Navbar/>
			}
			<Content>
				{props.children}
			</Content>
			{
				withFooter && <Footer/>
			}
		</StyledDiv>
	)
}
