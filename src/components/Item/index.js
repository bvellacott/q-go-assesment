import React from 'react'
import './style.css'

const Item = ({ content, complete, remove, toggleComplete }) => (
	<span className={`item ${complete ? 'item_complete' : 'item_incomplete'}`}>
		<span className="item_content">{content}</span>
		{toggleComplete && (
		<button className="item_toggleCompleteButton" onClick={toggleComplete}>
			{complete ? 'set to doing' : 'set to done'}
		</button>)}
		{remove && (
		<button className="item_removeButton" onClick={remove}>X</button>)}
	</span>)

export default Item
