// Construye la base de datos a partir del modelo definido en quiz.js
var path = require('path');

// Añadido para poder desplegar en Heroku y en local
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user = (url[2]||null);
var pwd = (url[3]||null);
var protocol = (url[1]||null);
var dialect = (url[1]||null);
var port = (url[5]||null);
var host = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar bbdd SQLite

var sequelize = new Sequelize(DB_name, user, pwd,
	{dialect: protocol, 
	protocol: protocol,
	port: port,
	host: host,
	storage: storage,
	omitNull: true
	}
);

// Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
exports.Quiz = Quiz; // exportar definicion de tabla Quiz

// sequelize.sync crea e inicializa la tabla definida en quiz.js
sequelize.sync().then(function(){
	// success(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().then(function(count){
		if (count === 0){ // La tabla se inicializa solo si está vacía
			Quiz.create({ pregunta: 'Capital de Italia',
						  respuesta: 'Roma'
						});
			Quiz.create({ pregunta: 'Capital de Portugal',
						  respuesta: 'Lisboa'
						})
			.then(function(){console.log('Base de datos inicializada')});
		}
	});
});