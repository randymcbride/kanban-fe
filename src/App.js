import React from 'react';
import './App.css';
import { useSelector, useDispatch } from "react-redux";
import { columnSelector, moveCard, moveColumn } from "./features/column/columnSlice";
import Column from "./features/column/Column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export default function App() {
	const columns = useSelector(columnSelector);
	const dispatch = useDispatch();

	const handleDragEnd = (dragResult) => {
		if (!dragResult.destination) {
			return;
		}
		if (dragResult.type === "card") {
			handleCardDrag(dragResult);
		} else {
			handleColumnDrag(dragResult);
		}
	};

	const handleCardDrag = (dragResult) => {
		console.log(dragResult);
		const payload = {
			cardId: dragResult.draggableId,
			source: {
				columnId: dragResult.source.droppableId,
				index: dragResult.source.index
			},
			destination: {
				columnId: dragResult.destination.droppableId,
				index: dragResult.destination.index
			}
		};
		dispatch(moveCard(payload));
	};

	const handleColumnDrag = (dragResult) => {
		dispatch(moveColumn({
			destinationIndex: dragResult.destination.index,
			sourceIndex: dragResult.source.index
		}));
	};

	return (
		<div className="app">
			<DragDropContext
				onDragEnd={handleDragEnd}
			>
				<Droppable droppableId="columns" direction="horizontal" type="column">
					{(provided) => (
						<div className="column-container" ref={provided.innerRef} {...provided.droppableProps}>
							{
								columns.map((column, index) => (
									<Column key={column.id} column={column} index={index} />
								))
							}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext >
		</div>
	);
}
