/* https://github.com/widgetsinteractivos/fetch_app */
class App {
	/*
		▼ (#) METODOS ESTATICOS PARA CADA ELEMENTO ▼

		static get BUTTON_ELEMENT(){ //<-- Metodo estatico
			//********* ▼ retorno la captura del boton ▼ *********
			return document.querySelector(".user-button")
		}

		static get INPUT_ELEMENT(){ //<-- Metodo estatico
			//********* ▼ retorno la captura de la casiila ▼ *********
			return document.querySelector(".user-input")
		}
	*/
	
	/*
	URL DE LA API:
	- https://jsonplaceholder.typicode.com/users/X
	- https://jsonplaceholder.typicode.com/post?userID=X
	*/

	static get BASE_URL(){ //<-- Metodo estatico
		return "https://jsonplaceholder.typicode.com";
	}
	/* ▼ (#) Refactorizacion para cargar todos los elementos en un solo metodo ▼ */
	static get ELEMENTS(){ //<-- Metodo estatico

		return {
			button : document.querySelector(".user-button"),
			input : document.querySelector(".user-input"),
			userInfo : document.querySelector(".user-name"),
			userPosts : document.querySelector(".user-posts")
		}

	}

	constructor(){
		this.init() //<-- Apenas se instancie el objeto App... ejecutar el metodo init()
	}

	getUser(){ //<-- Metodo de instancia
		//let userID = App.INPUT_ELEMENT.value //<-- Al clickear, leer el valor de la casilla... (version con metodos individuales)
		let userID = App.ELEMENTS.input.value //<-- Al clickear, leer el valor de la casilla...
		console.log(`Vamos a buscar el usuario #${userID}`)

		this.dataGenerator = this.getInfo(userID)
		this.dataGenerator.next()
	}

	*getInfo(userID){ //<-- Traer los datos del usuario y los post de ese usuario... (como un Generator)
		const user = yield this.fetchCall(`${App.BASE_URL}/users/${userID}`)
		const posts = yield this.fetchCall(`${App.BASE_URL}/posts?userID=${userID}`)

		this.render( user, posts ); //<-- Llamo al metodo render para armar la interfaz
	}

	fetchCall(url){

		fetch(url)
		.then( data => data.json() )
		.then( data => this.dataGenerator.next(data) ) //<-- .next(param) ▶ El param le indica al generator que antes de pasar al siguiente yield se guarde la data obtenida en la variable/constante que ataja el yield ejecutado
		.catch( error => `Error :( ▶ ${error}`)

	}

	render(theUser, thePosts){

		const { name, username } = theUser; //<-- Desectructurar 'theUser' extrayendo las propiedades name/username como variables/constantes sueltas dentro de render()
		
		const userHeader = `<strong>${name} (AKA ${username})</strong>`
		const userPosts = thePosts.map(post => `<li>${post.title}</li>`)

		App.ELEMENTS.userInfo.innerHTML = userHeader
		App.ELEMENTS.userPosts.innerHTML = userPosts.join(" ")

	}

	init(){ //<-- Metodo para ejecutar .init() | 
		//App.BUTTON_ELEMENT.addEventListener("click", this.getUser ) //<-- Probar... ¿?
		//App.BUTTON_ELEMENT.addEventListener("click", this.getUser.bind(this) ) //<--  (version con metodos individuales)
		
		//********* ▼ Cuando inicialize, asigne al boton capturado un evento ▼ *********//
		App.ELEMENTS.button.addEventListener("click", this.getUser.bind(this) )
	}

}

/*
//Sin usar constructor
const mainApp = new App();
mainApp.init(); 
*/

//Usando constructor
new App();