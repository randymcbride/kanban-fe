import { createSlice, nanoid } from "@reduxjs/toolkit";

const slice = createSlice({
	name: "cards",
	initialState: {
		card1: { id: "card1", title: "Card 1", content: "Conent for card 1." },
		card2: { id: "card2", title: "Card 2", content: "Content for card 2" },
		card3: { id: "card3", title: "Card 3", content: "Content for card 3" },
	},
	reducers: {
		addCard(state, { payload: card }) {
			card.id = nanoid();
			state[card.id] = card;
		}
	}
});

export const { addCard } = slice.actions;

export default slice.reducer;