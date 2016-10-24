export function getDependencies() {
	return (dispatch) => {
		fetch('/graphDependencies').then((response) => {
			return response.json();
		}).then((responseJson) => {
			dispatch({
				type: 'MAP-DEPENDENCIES',
				data: JSON.parse(responseJson)
			});
			//this.mapData(JSON.parse(responseJson));
		})
	}
};