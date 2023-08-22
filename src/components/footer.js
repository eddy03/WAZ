import {styled} from '@mui/material/styles'
import {Box, Typography} from '@mui/material'

const StyledDiv = styled(Box)`
  flex: 0 0 70px;
  box-shadow: 2px 0px 4px -1px rgba(0, 0, 0, 0.2), 4px 0px 5px 0px rgba(0, 0, 0, 0.14), 1px 0px 10px 0px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export default function Footer(props) {

	return (
		<StyledDiv sx={{p: 2}}>
			<Typography variant={'body2'}>
				Copyright dontpushpush
			</Typography>
		</StyledDiv>
	)
}