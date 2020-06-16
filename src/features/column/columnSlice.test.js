import { moveCardReducer, moveColumnReducer } from "./columnSlice";

test("re-orders card to end in same column", () => {
	const state = {
		data: {
			1: { id: 1, title: "To Do", cardIds: [1, 2, 3] },
			2: { id: 2, title: "Doing", cardIds: [] },
			3: { id: 3, title: "Done", cardIds: [] },
		},
		ids: [1, 2, 3]
	};

	moveCardReducer(state, {
		payload: {
			cardId: 1,
			source: { columnId: 1, index: 0 },
			destination: { columnId: 1, index: 2 }
		}
	});
	expect(state.data[1].cardIds).toEqual([2, 3, 1]);
});

test("re-orders card to beginning in same column", () => {
	const state = {
		data: { 1: { id: 1, title: "To Do", cardIds: [1, 2, 3] } },
		ids: [1]
	};

	moveCardReducer(state, {
		payload: {
			cardId: 3,
			source: { columnId: 1, index: 2 },
			destination: { columnId: 1, index: 0 }
		}
	});
	expect(state.data[1].cardIds).toEqual([3, 1, 2]);
});

test("moves to new column", () => {
	const state = {
		data: {
			1: { id: 1, title: "To Do", cardIds: [1, 2, 3] },
			2: { id: 2, title: "To Do", cardIds: [4] },
		},
		ids: [1]
	};

	moveCardReducer(state, {
		payload: {
			cardId: 4,
			source: { columnId: 2, index: 0 },
			destination: { columnId: 1, index: 3 }
		}
	});
	expect(state.data[1].cardIds).toEqual([1, 2, 3, 4]);
	expect(state.data[2].cardIds).toEqual([]);
});

test("moves column", () => {
	const state = {
		ids: [1, 2, 3]
	};

	moveColumnReducer(state, {
		payload: {
			sourceIndex: 0,
			destinationIndex: 2
		}
	});
	expect(state.ids).toEqual([2, 3, 1]);
});