const Item = ({ content, complete, remove, toggleComplete }) => (
	<span className={`item ${complete ? 'item_complete' : 'item_incomplete'}`}>
		{toggleComplete && (
		<button className="item_toggleCompleteButton" onClick={toggleComplete}>
			{complete ? 'set to done' : 'set to incomplete'}
		</button>)}
		<span className="item_content">{content}</span>
		{remove && (
		<button className="item_removeButton" onClick={remove}>X</button>)}
	</span>)

export default Item
