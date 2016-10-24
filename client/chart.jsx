import React from 'react';
import { connect } from 'react-redux';
import ScatterPlot from './scatterPlot';
import { getDependencies } from './actions/index';

class Chart extends React.Component {
	constructor(props) {
		super(props);
	}
	componentWillMount() {
		this.props.getDependencies();
	}
	render() {
		console.log(this.props);
		if (this.props.dependencies) {
			return (
				<div>
					<h1> Your dependency graph! </h1>
					<ScatterPlot {...this.props}/>
				</div>
			)
		} else {
			return false; 
		}
	}
}

const mapStateToProps = (state) => {
	return {
		dependencies: state.dependencies,
		width: state.width,
		height: state.height,
		padding: state.padding,
	}
}

export default connect(mapStateToProps, { getDependencies })(Chart);