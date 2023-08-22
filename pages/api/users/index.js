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

    const {name} = query

    const reqResponse = await axios.get('https://reqres.in/api/users', {
      params: {per_page: 50}
    })

    const regex = new RegExp(`^${_.escapeRegExp(name)}`, 'i')
    let results = []
    if (!_.isEmpty(_.trim(name))) {
      reqResponse.data.data.forEach(d => {
        if (regex.test(d.first_name) || regex.test(d.last_name)) {
          results.push(d)
        }
      })
    }

    results.map(d => {
      d.email = d.email.replace(/\w/g, 'x')
    })

    res.json(results)
  } catch (err) {
    console.error(err.toString())
    res.status(500).json({msg: ''})
  }
}
