import React, { Component } from 'react';

class ToDo extends Component {
/*
	constructor(){
      super() //<-- Herencia: llama al constructor padre...
      /*
      this.state = { //<-- Setear en el estado las propiedades y valores por default (lo interpretará como una constante)
        title : '',
        responsible : '',
        description : '',
        priority : "low"
      }
      *
      //this.handleInput = this.handleInput.bind(this) //<-- Hay que attachearle el this porque en la asignacion del evento se pierde el scope
      //this.handleSubmit = this.handleSubmit.bind(this) //<-- Hay que attachearle el this porque en la asignacion del evento se pierde el scope
    }*/

	handleAddToDO(todo){
		/*
		this.setState({
			todos : [...this.state.todos, todo] //<-- Desarmar el array de Objects y rearmarlo con el nuevo Object ( evitando usar un .push() )
		})
		*/
	}
	handleDeleteTodo(index){
		/*
				Swal.fire({
					title: 'Are you sure?',
					text: "You won't be able to revert this!",
					type: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes, delete it!'
				}).then((result) => {
					if (result.value) {

						this.setState({
							// todos : this.state.todos.filter( (state, i) => {
							// 	return i !== index
							// }) //or...

							todos : this.state.todos.filter( (state, i) => i !== index )
						})

						Swal.fire(
							'Deleted!',
							'Your file has been deleted.',
							'success'
						)
					}
				})
		*/
	}
	render(){
		const theIndex = 9;
		const todo = {
			"title" : "Tarea #1",
			"responsible" : "Mark",
			"description" : "lorem iprum",
			"priority" : "low"
		}
		console.log(this.props)

		return(

			<div className="col-md-3" key={theIndex}>
				<div className="card mt-4">
					<div className="card-header">
						<h3>{todo.title}</h3>
						<span className="badge badge-pill btn-danger">
							{todo.priority}
						</span>
					</div>
					<div className="card-body">
						<p>{todo.description}</p>
						<p>{todo.responsible}</p>
					</div>
					<div className="card-footer">
						<button
							className="btn btn-danger"
							onClick={this.handleDeleteTodo.bind(this, theIndex)}
						>
							Borrar
						</button>
					</div>
				</div>
			</div>

		)
	}

}
export default ToDo;