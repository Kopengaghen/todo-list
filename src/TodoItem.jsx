import React, {useState} from 'react';

const TodoItem = () => {
	const [todos, setTodos] = useState([]);
	const [input, setInput] = useState('');

	const regExp = input.replace(/[^a-zA-Z\- ]/g, '');

	const addTodo = () => {
		if (input.trim() && regExp && input.length > 3) {
			setTodos([...todos, {text: input}]);
			setInput('');
		}
	};

	const enterKeyPress = (event) => {
		if (event.key === "Enter") {
			addTodo();
		}
	};

	const toggleTodo = (index) => {
		const newTodos = [...todos];
		newTodos[index].completed = !newTodos[index].completed;
		setTodos(newTodos);
	};

	const deleteTodo = (index) => {
		const newTodos = [...todos];
		newTodos[index].disappearing = true;
		setTodos(newTodos);

		setTimeout(() => {
			setTodos(newTodos.filter((_, i) => i !== index));
		}, 1000);
	};

	return (
		<div>
			<p className="h1">Todo List</p>
			<div className="input-group mb-3">
				<input
					type="text"
					className="form-control"
					value={input}
					onChange={e => setInput(e.target.value)}
					onKeyPress={enterKeyPress}
					placeholder="Add a new todo"
					maxLength='10'
				/>
				<div className="input-group-append">
					<button className="btn btn-success" onClick={addTodo}>Add</button>
				</div>
			</div>
			<ul>
				{todos.map((todo, index) => (
					<li key={index} style={{textDecoration: todo.completed ? 'line-through' : 'none'}}
					className={todo.disappearing ? 'disappear' : ''}>
						{todo.text}
						<button className="btn btn-warning" onClick={() => toggleTodo(index)}>
							{todo.completed ? 'Undo' : 'Complete'}
						</button>
						<button className="btn btn-danger" onClick={() => deleteTodo(index)}>Delete</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TodoItem;