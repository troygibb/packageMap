import React from 'react';

import ScatterPlot from './scatterPlot';

export default class Chart extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			width   : 1500,
  		height  : 1000,
  		padding : 30, 
  	};
		this.mapData = this.mapData.bind(this);
		this.randomNum = this.randomNum.bind(this);
	}
	randomNum() {
		return Math.floor(Math.random() * 1000);
	}
	mapData(graphArray) {
		this.setState({
			dataArray: graphArray.map((dataPoint) => { 
				return {
					name: dataPoint.name, 
					coords: [ this.randomNum(), this.randomNum()]
				};
			})
		})
	}
	componentWillMount() {
		fetch('/graphDependencies').then((response) => {
			return response.json();
		}).then((responseJson) => {
			this.mapData(JSON.parse(responseJson));
		})
	}
	render() {
		if (this.state.dataArray) {
			return (
				<div>
					<h1> Your dependencies! </h1>
					<ScatterPlot {...this.state}/>
				</div>
			)
		} else {
			return false; 
		}
	}
}