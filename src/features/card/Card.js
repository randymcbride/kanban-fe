import React from "react";
import style from "./cardStyle.module.css";
import { Draggable } from "react-beautiful-dnd";

export default function Card(props) {
	return (
		<Draggable draggableId={props.card.id + ""} index={props.index}>
			{(provided) => (
				<Container
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					innerRef={provided.innerRef}
				>
					{props.card.content}
				</Container>
			)}
		</Draggable>
	);
}

function Container({ children, innerRef, ...rest }) {
	return <div {...rest} className={style.container} ref={innerRef}>{children}</div>;
}