import axios from 'axios'
import _ from 'lodash'

export default async function handler(req, res) {

  const {method, headers, query, getToken} = req

  try {
    if (method !== 'GET') {
      return res.status(405).json({msg: 'Unsupported method'})
    }
    if (_.isEmpty(headers.authorization)) {
      return res.status(401).json({msg: 'Unauthorized'})
    }

    const myProfile = getToken(headers.authorization.replace(/^Bearer\s/, ''))
    if (_.isEmpty(myProfile)) {
      return res.status(401).json({msg: 'Unauthorized'})
    }

    const reqResponse = await axios.get(`https://reqres.in/api/users/${query.id}`)
    res.json(reqResponse.data.data)
  } catch (err) {
    if (err.response) {
      return res.status(err.response.status).json(err.response.data)
    }

    console.error(err.toString())
    res.status(500).json({msg: ''})
  }
}
