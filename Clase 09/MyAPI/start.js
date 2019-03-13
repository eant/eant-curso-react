/* Un middleware para procesar y llamar a index.js */
/*
Dependencias necesarias:

	npm install --save express body-parser lokijs

Aviso: instalar babel para usar sintaxis de import (sino, usar require):

	npm install babel-registrer babel-preset-env --save-dev (NOTA: --save-dev hace que se instale solo en el entorno de desarrollo y no en produccion)

Formas de ejecutar:
	node star.js
	node start (si se especifico en scripts del package.json 'start' como un alias de start.js)

	o si instalo la libreria "nodemon"

		npm install nodemon -g

*/
require("babel-register")({
	presets : ['env']
})
module.exports = require("./index.js")