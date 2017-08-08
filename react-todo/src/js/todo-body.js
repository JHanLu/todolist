import React from 'react'
import TodoApp from './todo-app'
export default class TodoBody extends React.Component{
	render(){
		return(
			<div>
				<h1>TODOS</h1>
				<TodoApp />
			</div>
		)
	}
}
