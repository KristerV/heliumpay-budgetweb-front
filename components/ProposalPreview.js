import React from 'react'
import Link from 'next/link'
import Paper from './Paper'

export default class extends React.Component {

	render () {
		const data = this.props.data
		const proposal = JSON.parse(data.DataString)[0][1]
		const href = `?proposal=${data.Hash}`
		return (
			<Link href={href}>
				<a>
					<Paper>
						<div className="container">
							<div>
								<h1>{data.AbsoluteYesCount}</h1>
							</div>
							<div>
								<p>{proposal.name}</p>
							</div>
							<div>
								<h2>{Math.round(proposal.payment_amount*100)/100}</h2><p>DASH</p>
							</div>
						</div>
					</Paper>
					<style jsx>{`
						a {
							width: 100%;
							display: inline-block;
							color: inherit;
							text-decoration: inherit;
						}
						.container {
							display: flex;
						}
						.container > div:nth-child(1) {
							flex-basis: 7em;
						}
						.container > div:nth-child(2) {
							flex-basis: 100%;
							word-break: break-all;
						}
						.container > div:nth-child(3) {
							flex-basis: 7em;
							text-align: center;
						}
					`}</style>
				</a>
			</Link>
		)
	}
}