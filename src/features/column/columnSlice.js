import { createSlice, nanoid } from "@reduxjs/toolkit";

const slice = createSlice({
	name: "columns",
	initialState: {
		data: {
			col1: { id: "col1", title: "To Do", cardIds: ["card1", "card2", "card3"] },
			col2: { id: "col2", title: "Doing", cardIds: [] },
		},
		ids: ["col1", "col2",]
	},
	reducers: {
		addColumn: addColumnReducer,
		moveCard: moveCardReducer,
		moveColumn: moveColumnReducer
	}
});

export const { addColumn, moveCard, moveColumn } = slice.actions;

export function columnSelector({ columns, cards }) {
	return columns.ids.reduce((resultsArray, columnId) => {
		const column = { ...columns.data[columnId] };
		column.cards = column.cardIds.map((cardId) => cards[cardId]);
		resultsArray.push(column);
		return resultsArray;
	}, []);
}

export function addColumnReducer(state, { payload: column }) {
	column.id = nanoid();
	state.data[column.id] = column;
	state.ids.push(column.id);
}

export function moveCardReducer(state, { payload }) {
	const { destination, source, cardId } = payload;
	const destinationColumn = state.data[destination.columnId];
	const sourceColumn = state.data[source.columnId];

	sourceColumn.cardIds.splice(source.index, 1);
	destinationColumn.cardIds.splice(destination.index, 0, cardId);
}

export function moveColumnReducer(state, { payload }) {
	const { destinationIndex, sourceIndex } = payload;
	const columnId = state.ids.splice(sourceIndex, 1)[0];
	state.ids.splice(destinationIndex, 0, columnId);
}

export default slice.reducer;