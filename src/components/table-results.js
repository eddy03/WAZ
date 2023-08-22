import _ from 'lodash'

import {styled} from '@mui/material/styles'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';

const StyledDiv = styled(Box)`
  .special {
    cursor: pointer;
  }
`

export default function TableResults(props) {

  const {isLoading, data, setViewId} = props

  return (
    <StyledDiv sx={{pt: 4}}>
      {
        isLoading && (
          <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', pt: 2, pb: 4}}>
            <CircularProgress />
          </Box>
        )
      }
      {
        !isLoading && _.isArray(data) && _.isEmpty(data) && (
          <Alert severity={"info"}>
            No results
          </Alert>
        )
      }
      {
        !isLoading && _.isArray(data) && !_.isEmpty(data) && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Avatar</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="right">First Name</TableCell>
                  <TableCell align="right">Last Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  data.map((row, i) => (
                    <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell align={"left"}>
                        <Avatar src={row.avatar} />
                      </TableCell>
                      <TableCell align="left" className={'special'}>
                        <span onClick={() => setViewId(row.id)}>
                          {row.email}
                        </span>
                      </TableCell>
                      <TableCell align="right">{row.first_name}</TableCell>
                      <TableCell align="right">{row.last_name}</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        )
      }
    </StyledDiv>
  )
}