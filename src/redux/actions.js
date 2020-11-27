const loadIDs = (IDS) => {
	return {
		type: "LOAD_IDS",
		payload: IDS
	};
};

const update = () => {
	return {
		type: 'UPDATE'
	}
}

export {
	loadIDs,
	update
}