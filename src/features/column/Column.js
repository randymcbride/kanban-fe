import React from "react";
import style from "./column.module.css";
import Card from "../card/Card";
import { Droppable, Draggable } from "react-beautiful-dnd";
import classNames from "classnames";

export default function Column(props) {
	return (
		<Draggable draggableId={props.column.id + ""} index={props.index}>
			{(provided) => (
				<div className={style.container} ref={provided.innerRef} {...provided.draggableProps}>
					<div className={style.title} {...provided.dragHandleProps}>{props.column.title}</div>
					<Droppable droppableId={props.column.id + ""} type="card">
						{(provided, snapshot) => (
							<div>
								<div
									className={classNames({
										[style.cardList]: true,
										[style.isDraggingOver]: snapshot.isDraggingOver
									})}
									ref={provided.innerRef}
									{...provided.droppableProps}
									cards={props.column.cards}
									snapshot={snapshot}
								>
									{props.column.cards.map((card, index) => <Card key={card.id} card={card} index={index} />)}
									{provided.placeholder}
								</div>
							</div>
						)}
					</Droppable>
				</div>
			)}
		</Draggable>
	);
}