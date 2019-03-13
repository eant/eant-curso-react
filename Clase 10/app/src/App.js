import React, { Component } from 'react';
import Swal from 'sweetalert2'    
import logo from './logo.svg';
import './App.css';

import Navigation from './components/Navigation'
import TodoForm from './components/TodoForm'
import TodoContainer from './components/TodoContainer'

//import { todos } from './todos.json'
//import { getAll } from './Api'

import Api from './Api'
const Client = new Api() //<-- Hay que instanciar cuando es importacion de una Class

class App extends Component {

  constructor(){
    super();
    this.state = {
      todos : [],
      error : null,
      isLoaded : false
    }

    //Client.getAll().then( data => console.log(data) )
    Client.getAll()
          .then(
            (items) => { this.setState({ isLoaded : true, todos : items }) },
            (error) => { this.setState({ isLoaded : true, error : error }) }
          )

    this.handleAddTodo = this.handleAddTodo.bind(this)    
  }

  handleAddTodo(todo){
    this.setState({ todos : [...this.state.todos,todo] })
  }

  // 2 Creamos el handle
  handleDeleteTodo(index){
    console.log( index )
    Swal.fire({
      title: 'Está seguro que desea borrar la tarea',
      text: "Esta accion no se puede deshacer",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar'
    }).then((result) => {

      if (result.value) {

        Client.delete(index).then( () => {
          this.setState({ todos : this.state.todos.filter((e) => { return e.id !== index }) }) 
        })

        Swal.fire(
          'Borrado',
          'Su tarea ha sido borrada.',
          'success'
        )
      }
    })  
  }

  render() {
    const { error, isLoaded } = this.state;
    
    if(error){
      
      return <div>${error.message}</div>

    } else if(!isLoaded){

      return <div>Cargando...</div>

    } else {
      return (
        <div className="App">      
          <Navigation titulo="TodoApp Extreme" />

          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <img src={logo} className="App-logo" alt="logo" /> 
                <TodoForm onAddTodo={this.handleAddTodo} />
              </div>

              <div className="col-md-8">
                  <TodoContainer todos={this.state.todos} onDeleteTodo={this.handleDeleteTodo.bind(this)} />
              </div>

            </div>
          </div>
        </div>      
      );
    }

  }
}

export default App;
