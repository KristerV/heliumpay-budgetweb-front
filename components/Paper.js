export default props => (
	<div className="paper">
		{props.children}
		<style jsx>{`
			.paper {
				width: 100%;
				background-color: white;
				box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.3);
				margin: 0.5em 0;
				padding: 1em;
				box-sizing: border-box;
				border-radius: 3px;
			}
		`}</style>
	</div>
)
