const initialState = {
	IDsList: [],
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "LOAD_IDS":
			return {
				...state,
				IDsList: action.payload
			};
		default:
			return state;
	}
}

export default reducer;