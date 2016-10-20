import React from 'react';

const data = [10,5,2,3,7,8,4,3,2];

const renderCircles = (props) => {
  return (coords, index) => {
    const circleProps = {
      cx: props.xScale(coords[0]),
      cy: props.yScale(coords[1]),
      r: 2,
      key: index
    };
    return <circle {...circleProps} />;
  };
};

export default class Nodes extends React.Component {
	render() {
  	return <g>{ props.data.map(renderCircles(data)) }</g>
  }
}