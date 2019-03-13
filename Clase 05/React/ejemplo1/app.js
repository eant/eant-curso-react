//JSX (JavaScript y XML) es una sintaxis
//ReactDOM.render(queRenderizo, dondeRenderizo)
/*
ReactDOM.render(
	<h1>X</h1>,
	document.querySelector("#root")
)
*/

class Hello extends React.Component {

	render(){
		return <h1>Hola React</h1>
	}
}

ReactDOM.render(
	<Hello />,
	document.querySelector("#root")
)
//Navegar a https://reactstrap.github.io/

//npm -g install create-react-app