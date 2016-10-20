import React from 'react';
import DataCircles from './dataCircles';

export default class ScatterPlot extends React.Component {
	constructor(props) {
		super(props);
		this.xScale = this.xScale.bind(this);
		this.yScale = this.yScale.bind(this);
	}
	xMax(data) {
		return d3.max(data, (d) => d.coords[0])
	}
	yMax(data) {
		return d3.max(data, (d) => d.coords[1])
	}
	xScale(props) {
	  return d3.scale.linear()
	    .domain([0, this.xMax(props.dataArray)])
	    .range([props.padding, props.width - props.padding * 2]);
	}
	yScale(props) {
	  return d3.scale.linear()
	    .domain([0, this.yMax(props.dataArray)])
	    .range([props.height - props.padding, props.padding]);
	}
	render() {
		console.log(this.props);
		const props = this.props;
		const scales = { xScale: this.xScale(props), yScale: this.yScale(props) };
	  return (
	  	<svg width={props.width} height={props.height}>
	    	<DataCircles {...props} {...scales} />
	  	</svg>
	  )
	}
}
