import {useEffect, useState} from 'react'
import _ from 'lodash'
import {useSelector} from 'react-redux'
import Cookie from 'js-cookie'

import Head from 'next/head'
import { useRouter } from 'next/navigation'

import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import Wrapper from '@comp/wrapper'
import request from '@lib/request'
import cookieName from '@lib/cookie-key'
import TableResults from "@comp/table-results";
import DialogShowEmail from "@comp/dialog-show-email";

export default function Home() {

  const router = useRouter()

  const {me} = useSelector(state => state.profile)
  const [name, setName] = useState('')
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [viewId, setViewId] = useState(null)

  useEffect(() => {
    if (_.isEmpty(me)) {
      router.push('/auth')
    }

  }, [])

  async function submit (e) {
    e.preventDefault()
    e.stopPropagation()

    setIsLoading(true)
    request.get('users', {
      params: {name},
      headers: {Authorization: Cookie.get(cookieName)}
    })
      .then(response => setResults(response.data))
      .catch(err => {
        console.error(err.toString())
      })
      .finally(() => setIsLoading(false))
  }
  
  return (
    <>
      <Head>
        <title>My Assignment</title>
        <meta name="description" content="My Assigment" />
      </Head>
      <Wrapper>
        <Typography variant={'h5'} sx={{pb: 4, pt: 1}}>
          Search for profile
        </Typography>
        <form onSubmit={submit}>
          <TextField
            fullWidth
            value={name}
            onChange={e => setName(e.target.value)}
            variant={'outlined'}
            label={'Search profile'}
            InputLabelProps={{shrink: true}}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type={'submit'}>
                    <SearchOutlinedIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </form>

        <TableResults isLoading={isLoading} data={results} setViewId={setViewId} />
        {
          !_.isNull(viewId) && _.isNumber(viewId) && (
            <DialogShowEmail id={viewId} onClose={() => setViewId(null)} />
          )
        }
      </Wrapper>
    </>
  )
}
