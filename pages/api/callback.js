import _ from 'lodash'
import {OAuth2Client} from 'google-auth-library'
import {nanoid} from 'nanoid'

export default async function handler(req, res) {
	const {method, body, cookies, addToken} = req

	const client = new OAuth2Client()

	try {
		if (method !== 'POST') {
			return res.redirect(`/callback?msg=${encodeURIComponent('unsupported method')}&type=error`)
		}

		const {clientId, credential, g_csrf_token: csrfToken} = body

		if (!_.isEqual(csrfToken, cookies['g_csrf_token'])) {
			return res.redirect(`/callback?msg=${encodeURIComponent('Invalid request')}&type=error`)
		}

		if (!_.isEqual(clientId, process.env.GOOGLE_CLIENT_ID)) {
			return res.redirect(`/callback?msg=${encodeURIComponent('Invalid request')}&type=error`)
		}

		let ticket = null

		try {
			ticket = await client.verifyIdToken({idToken: credential, audience: clientId})
		} catch (err) {
			return res.redirect(`/callback?msg=${encodeURIComponent('Invalid authentication')}&type=error`)
		}

		const payload = ticket.getPayload()
		payload.token = nanoid()

		addToken(payload)

		res.redirect(`/callback?token=${payload.token}`)
	} catch (err) {
		console.error(err.toString())
		res.redirect(`/auth?msg=${encodeURIComponent('There is an error while processing your request')}&type=${encodeURIComponent('error')}`)
	}
}
