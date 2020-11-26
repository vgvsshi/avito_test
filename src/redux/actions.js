const loadIDs = (IDS) => {
	return {
		type: "LOAD_IDS",
		payload: IDS
	};
};

export {
	loadIDs
}