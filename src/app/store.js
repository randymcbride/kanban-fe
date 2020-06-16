import { configureStore } from '@reduxjs/toolkit';
import columns from "../features/column/columnSlice";
import cards from "../features/card/cardSlice";

export default configureStore({
	reducer: {
		columns,
		cards
	},
});
