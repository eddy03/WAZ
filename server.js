/**
 * Why using custom server?
 * Because we can use like mysql/postgres pool
 * or Redis without terminate connection
 *
 */

const {createServer} = require('http')
const {parse} = require('url')
const next = require('next')
const _ = require('lodash')

const dev = process.env.NODE_ENV !== 'production'
// When using server, or docker or GCP Cloud Run. We can set PORT env externally
// PORT won't be available until nextjs loaded
const port = Number(process.env.PORT || 3000)

const app = next({dev, hostname: '0.0.0.0', port})
const handle = app.getRequestHandler()

// Logged is to store currently authenticated user
// This supposed to be on REDIS or any other storage
// For this assignment. i just make it simple.
const logged = []

app.prepare()
	.then(async () => {
		// Debugging purpose
		const getAll = function () {
			return logged
		}

		// Get the user token
		const getToken = function (token) {
			return _.find(logged, {token})
		}

		// Add new token
		const addToken = function (payload) {
			if (_.isEmpty(_.trim(payload.token))) {
				throw new Error('Token is required!')
			}

			const index = _.findIndex(logged, {token: payload.token})
			if (index !== -1) {
				logged[index] = payload
			} else {
				logged.push(payload)
			}
		}

		// Remove a token
		const removeToken = function (token) {
			const index = _.findIndex(logged, {token})
			if (index !== -1) {
				logged.splice(index, 1)
			}
		}

		createServer(async (req, res) => {
			try {
				// Assign to req so it can be access in pages or api handler
				req.getAll = getAll
				req.getToken = getToken
				req.addToken = addToken
				req.removeToken = removeToken

				await handle(req, res, parse(req.url, true))
			} catch (err) {
				res.statusCode = 500
				res.end('Internal Server Error')
			}
		})
			.once('error', err => {
				console.error(err)
				process.exit(1)
			})
			.listen(port, () => {
				// MAC will behave differently
				console.log(`> Ready on http://localhost:${port}`)
			})
	})
