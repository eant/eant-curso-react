import React,{ Component } from 'react';

class TodoForm extends Component {
    //Leer inputs del form (necesito el constructor para setear funciones/eventos/estados)
    constructor(){
      super() //<-- Herencia: llama al constructor padre...
      this.state = { //<-- Setear en el estado las propiedades y valores por default (lo interpretará como una constante)
        title : '',
        responsible : '',
        description : '',
        priority : "low"
      }

      this.handleInput = this.handleInput.bind(this) //<-- Hay que attachearle el this porque en la asignacion del evento se pierde el scope
      //this.handleSubmit = this.handleSubmit.bind(this) //<-- Hay que attachearle el this porque en la asignacion del evento se pierde el scope
    }

    handleInput(e){ //<-- (#) funcion para asociar a un evento...
      //console.log(`Writting... ${e.target.name}`);
      //console.log(`Writting... ${e.target.value}`);
      const { name, value } = e.target; //<-- Destructuracion del objeto (ej: { title : 'Tarea #5' })

      this.setState({ //<-- Hacer un override del state...
        [name]: value
      })
      console.log(this.state)
    }

    handleSubmit(e){
      e.preventDefault()
      
      console.log(this.state)
      
      this.props.onAddToDO(this.state) //<-- Ejecutar el evento onXXX para que haga render en el item visual...

      this.setState({ //<-- Hacer un override del state...
        title : '',
        responsible : '',
        description : '',
        priority : "low"
      })
    }

    render(){
        return(
          <div className="card">
            <form className="card-body" onSubmit={this.handleSubmit.bind(this)}>
              <div className="form-group">
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Title"
                  onChange={this.handleInput} //<-- (#) Asignar una funcion al evento...
                  value={this.state.title}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="responsible"
                  className="form-control"
                  placeholder="Responsible"
                  //onChange={this.handleInput.bind(this)} //<-- (#) Asignar una funcion al evento...
                  onChange={this.handleInput} //<-- (#) Asignar una funcion al evento...
                  value={this.state.responsible}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  placeholder="Description"
                  onChange={this.handleInput} //<-- (#) Asignar una funcion al evento...
                  value={this.state.description}
                />
              </div>
              <div className="form-group">
                <select
                  name="priority"
                  className="form-control"
                  onChange={this.handleInput} //<-- (#) Asignar una funcion al evento...
                  value={this.state.priority}
                >
                  <option>low</option>
                  <option>medium</option>
                  <option>high</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">Save</button>
            </form>
          </div>
        )       
    }
}
export default TodoForm;