const initialState = {
	IDsList: [],
	update: 0
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "LOAD_IDS":
			return {
				...state,
				IDsList: action.payload
			};
		case "UPDATE":
			return {
				...state,
				update: state.update + 1
			}
		default:
			return state;
	}
}

export default reducer;