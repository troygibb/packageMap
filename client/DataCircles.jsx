import React from 'react';
import uuid from 'uuid';

export default class DataCircles extends React.Component {
	constructor(props) {
		super(props);
	}
	renderCircles(node, i) {
    const circleProps = {
      cx: this.props.xScale(node.coords[0]),
      cy: this.props.yScale(node.coords[1]),
      fill: '#a0a0ed',
      r: 20,
    };
    const textProps = {
    	x: this.props.xScale(node.coords[0]),
      y: this.props.yScale(node.coords[1]),
      textAnchor: "middle",
      fontSize: "15px"
    }
    const lines = node.edges.map((edge) => {
    	if (edge.coords) {
	    	return (
	    		<line
	    		x1={this.props.xScale(node.coords[0])}
	    		y1={this.props.yScale(node.coords[1])}
	    		x2={this.props.xScale(edge.coords[0])}
	    		y2={this.props.yScale(edge.coords[1])}
	    		stroke="#8080e7"
	    		strokeWidth="1px"
	    		fill="none"/>
	    	)
	    } else {
	    	return false;
	    }
    })
    return (
    	<g key={uuid.v4()} >
	    	<circle {...circleProps} />
	    	<text {...textProps} >{node.name}</text>
	    	{lines}
	    </g>
    );
	}
	moveCircles() {
		d3.selectAll('circle')
			
	}
	render() {
		const circles = this.props.dependencies.map((node, i) => this.renderCircles(node, i));
		return (
			<g>
				{ circles }
			</g>
		)
	}
}