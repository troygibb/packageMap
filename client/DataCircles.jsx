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
      fill: 'green',
      r: 10,
    };
    const textProps = {
    	x: this.props.xScale(node.coords[0]),
      y: this.props.yScale(node.coords[1]),
      textAnchor: "middle",
      fontSize: "15px"
    }
    return (
    	<g key={uuid.v4()} >
	    	<circle {...circleProps} />
	    	<text {...textProps} >{node.name}</text>
	    </g>
    );
	};
	render() {
		const circles = this.props.dataArray.map((node, i) => this.renderCircles(node, i));
		return (
			<g>
				{ circles }
			</g>
		)
	}
}