import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Navigation from './components/Navigation'; //<-- <Navigation />
import TodoForm   from './components/TodoForm'; //<-- <TodoForm />
import ToDo from './components/ToDo'; //<-- <ToDo />

import { todos }  from './todos.json'; //<-- #
import Swal from 'sweetalert2'


//import { saludar, despedir, numero } from './helpers/Hello.js'; //<-- Importacion normal
//import { * } from './helpers/Hello.js'; //<-- Importar todos... se ejecuta: Helper.saludar('Ryu')
import { saludar as S, despedir as D, numero as N } from './helpers/Hello.js'; //<-- Permite ponerle un alias a cada funcion del modulo importado

import calcular from './helpers/AreaCirculo.js'; //<-- Permite ponerle un nombre propio al importar


//** ▼ Ejecucion de los modulos importados ▼ **/
	//saludar('Luigi')
	S('Sonic')

	//despedir('Wario')
	D('Tails')

	//console.log( numero )
	console.log( N )

	console.log( calcular(56) )
//** ▲ Ejecucion de los modulos importados ▲ **/

class App extends Component {

	constructor(){
		super()
		this.state = { todos } //<-- { todos : todos } //<-- #
		this.handleAddToDO = this.handleAddToDO.bind(this)
	}
	

	render(){
/*
		const itemsToDOs = this.state.todos.map( (todo, theIndex) => {
			return (
				
			)
		})
*/
		return (
			/************* TODO ACÁ ADENTRO *************/
			<div className="App">

				<Navigation titulo="The Menu" subtitulo="JSX" />
				
				<div className="container">
					<div className="row">
						<div className="col-md-4">
							
							<img src={logo} className="App-logo" alt="logo" />

							<TodoForm onAddToDO={this.handleAddToDO} />

						</div>
						<div className="col-md-8">

							<div className="row">
								 <ToDo />
							</div>

						</div>
					</div>
					

				</div>

			</div>
			/************* AFUERA, NADA *************/
		)
	}
}
export default App;