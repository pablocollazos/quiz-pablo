// Definicion del modelo de datos de la aplicacion Quiz

module.exports = function (sequelize, DataTypes){
	return sequelize.define('Quiz',
		{
			pregunta:{ 
				type: DataTypes.STRING,
				validate: { notEmpty: {msg: "-> Falta Pregunta"}}
			}, 
			respuesta: {
				type: DataTypes.STRING,
				validate: {notEmpty: {msg: "--> Falta respuesta"}}
			},
			tema:{
				type: DataTypes.STRING,
				validate: {notEmpty: {msg: "--> Falta tema"}}
			}
		}
		);
}