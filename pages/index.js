import {useEffect, useState} from 'react'
import _ from 'lodash'
import {useSelector} from 'react-redux'

import Head from 'next/head'
import { useRouter } from 'next/navigation'

import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import Wrapper from '@comp/wrapper'
import IconButton from '@mui/material/IconButton'

export default function Home() {

  const router = useRouter()

  const {me} = useSelector(state => state.profile)

  const [search, setSearch] = useState([])

  useEffect(() => {
    if (_.isEmpty(me)) {
      router.push('/auth')
    }

  }, [])

  function submit (e) {
    e.preventDefault()
    e.stopPropagation()
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
            value={search}
            onChange={e => setSearch(e.target.value)}
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
      </Wrapper>
    </>
  )
}
