export function addDemolist(list) {
	return {
		type: 'ADD_DEMO',
		list
	};
}

export function removeTodo(todo) {
	return {
		type: 'REMOVE_TODO',
		todo
	};
}