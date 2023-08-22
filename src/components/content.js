import {styled} from '@mui/material/styles'
import Container from '@mui/material/Container'

const StyledContainer = styled(Container)`
  flex: 1 1 auto;
`

export default function Content(props) {

	return (
		<StyledContainer sx={{p: 2}}>
			{props.children}
		</StyledContainer>
	)
}