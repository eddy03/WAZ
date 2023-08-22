import {useEffect, useState} from 'react'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import request from "@lib/request";
import Cookie from "js-cookie";
import cookieName from "@lib/cookie-key";


export default function DialogShowEmail(props) {

  const {id, onClose} = props

  const [data, setData] = useState({})

  useEffect(() => {

    request.get(`users/${id}`, {headers: {Authorization: Cookie.get(cookieName)}})
      .then(response => setData(response.data))
      .catch(err => {
        console.error(err.toString())
      })

  }, [id])

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth={'sm'}>
      <DialogTitle>Show email</DialogTitle>
      <DialogContent>
        <DialogContentText>{data.first_name} {data.last_name}</DialogContentText>
        <DialogContentText>{data.email}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant={"text"} onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}