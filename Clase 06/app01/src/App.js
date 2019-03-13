import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Navigation from './components/Navigation';
import { todos } from './todos.json';

class App extends Component {

	constructor(){
		super()

		this.state = { todos } //<-- { todos : todos }
	}

	render(){

		const todos = this.state.todos.map( (todo, index) => {
			return (
				<div className="card" key={index}>
					{todo.title}
				</div>
			)
		})

		return (
			/************* TODO ACÁ ADENTRO *************/
			<div className="App">

				<Navigation titulo="The Menu" subtitulo="JSX" />

				<img src={logo} className="App-logo" alt="logo" />
				
				{todos}

			</div>
			/************* AFUERA, NADA *************/
		)
	}
}

export default App;