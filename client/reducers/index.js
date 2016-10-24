import { mapDependencies } from './mapDependencies';

const intitialState = {
	width: 1500,
	height: 1000,
	padding: 30,
};

const actionHandler = {
	'MAP-DEPENDENCIES': mapDependencies
};


const reducer = (state = intitialState, action) => {
  if (actionHandler[action.type]) {
    return actionHandler[action.type](state, action);
  }
  return state;
};

export default reducer;