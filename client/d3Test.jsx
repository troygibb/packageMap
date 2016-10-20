import React from 'react';

export default class d3Test extends React.Component {
	constructor(props) {
		super(props);
	}
	componentWillMount() {
		fetch('/graphDependencies').then((response) => {
			return response.json();
		}).then((responseJson) => {
			console.log(JSON.parse(responseJson));
		});
	}
	render() {
		return (
			<svg width="1000px" height="500px">
			  <circle id="d" cx="100" cy="100" r="100"/>
			</svg>
		)
	}
}

// <svg id="d" width="1000px" height="500px">
			