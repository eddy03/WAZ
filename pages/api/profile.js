import _ from 'lodash'

export default async function handler(req, res) {

	const {method, headers, getToken} = req

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

		res.json(myProfile)
	} catch (err) {
		console.error(err.toString())
		res.status(500).json({msg: 'There is an error'})
	}
}
