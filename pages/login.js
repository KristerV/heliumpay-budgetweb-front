import React from 'react'
import Link from 'next/link'
import router from 'next/router'
import moment from 'moment'
import Bitcore from 'bitcore-lib-dash'
import NoScript from 'react-noscript'
import config from '../config'
import ApiClient from '../utils/ApiClient'
import LayoutColumns from '../components/LayoutColumns'
import Paper from '../components/Paper'
import Alert from '../components/Alert'

const client = new ApiClient(config.apiUrl)
const views = {
	login: 'login',
	register: 'register',
	sendPasswordResetEmail: 'sendPasswordResetEmail'
}

export default class extends React.Component {
	state = {
		view: 'login',
		username: '',
		password: '',
		confirmPassword: '',
		email: '',
		resetlinkSent: false
	}

	static async getInitialProps(ctx) {
		const client = new ApiClient(config.apiUrl, ctx)
		return {
			isLoggedIn: client.isLoggedIn()
		}
	}

	setFormValue = prop => e => {
		this.setState({ [prop]: e.target.value })
	}

	setView = view => e => {
		e.preventDefault()
		this.setState({ view })
	}

	login = async e => {
		e.preventDefault()
		const { username, password } = this.state
		this.setState({ error: null })

		try {
			await client.login(username, password)
			router.push('/')
		} catch (error) {
			this.setState({ error: error.message })
		}
	}

	render() {
		const { isLoggedIn } = this.props
		const { username, password, error } = this.state

		return (
			<LayoutColumns isLoggedIn={isLoggedIn} onLogout={this.logout}>
				<div className="item">
					<h1>Login</h1>
					<Paper>
						<form onSubmit={this.login}>
							<table>
								<tbody>
									<tr>
										<td>
											<label>Username</label>
										</td>
										<td>
											<input
												value={username}
												onChange={this.setFormValue('username')}
											/>
										</td>
										<td />
									</tr>
									<tr>
										<td>
											<label>Password</label>
										</td>
										<td>
											<input
												type="password"
												value={password}
												onChange={this.setFormValue('password')}
											/>
										</td>
										<td>
											<small>
												<Link href="/forgotPassword" prefetch>
													<a>Forgot?</a>
												</Link>
											</small>
										</td>
									</tr>
								</tbody>
							</table>
							<br />
							{error && <Alert>{error}</Alert>}
							<button type="submit">Login</button>
							<br />
						</form>
						<br />
						<small>
							Don&apos;t have an account?&nbsp;
							<Link
								href={{
									pathname: '/register',
									query: username ? { username } : {}
								}}
								prefetch
							>
								<a>Register</a>
							</Link>
						</small>
					</Paper>
				</div>
			</LayoutColumns>
		)
	}
}