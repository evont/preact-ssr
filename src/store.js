import { createStore } from 'redux';

let ACTIONS = {
	ADD_DEMO: ({ demolist, ...state }, { list }) => ({
		demolist: list,
		...state
	}),

	REMOVE_TODO: ({ todos, ...state }, { todo }) => ({
		todos: todos.filter( i => i!==todo ),
		...state
	})
};

const INITIAL = {
	demolist: [],
	todos: []
};

export default createStore( (state, action) => (
	action && ACTIONS[action.type] ? ACTIONS[action.type](state, action) : state
), INITIAL, typeof devToolsExtension==='function' ? devToolsExtension() : undefined);