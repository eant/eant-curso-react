import React, { Component } from 'react';

class Navigation extends Component {

	render(){
		return(

			<nav className="navbar navbar-dark bg-dark">
				<a className="text-white" href="https://reactjs.org">
					<span>{this.props.titulo}</span> <small>{this.props.subtitulo}</small>
				</a>
			</nav>

		)
	}

}
export default Navigation;