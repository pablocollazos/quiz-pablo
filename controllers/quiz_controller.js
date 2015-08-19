var models = require('../models/models.js');

//Autoload - factoriza el codigo si ruta incluye :quizId
exports.load = function(req, res, next, quizId){
	models.Quiz.find(quizId).then(
		function(quiz){
			if (quiz){
				// Ponemos la quiz encontrada en el request
				req.quiz = quiz;
				next();
			}else{
				next(new Error('No existe quizId='+quizId));
			}
		}
	).catch(function(error){next(error);});
}

// GET /quizes
exports.index = function(req, res){
	var cadenaBusqueda;
	if(req.query.search){
		cadenaBusqueda=(req.query.search||"").replace(" ","%");
	}else{
		cadenaBusqueda="";
	}
	models.Quiz.findAll(
		{where:['upper(pregunta) like upper(?)','%'+cadenaBusqueda+'%'],order:'pregunta ASC'}
		).then(function(quizes){
			res.render('quizes/index',{quizes:quizes, errors:[]});
		}).catch(function(error){next(error);});


	// models.Quiz.findAll()
	// .then(function(quizes){
	// 	res.render('quizes/index', {quizes: quizes});
	// })
	// .catch(function(error){next(error);});
}

//GET /quizes/:id
exports.show = function(req, res){
	// Ya no necesito hacer la busqueda por id ya que se hace en la
	// funcion load.
	// models.Quiz.find(req.params.quizId).then(function(quiz){
		res.render('quizes/show',{quiz: req.quiz, errors:[]});
	// });
}


//GET /quizes/:id/answer
exports.answer = function(req, res){

		if (req.query.respuesta === req.quiz.respuesta){
			res.render('quizes/answer',{quiz: req.quiz, respuesta: 'Correcto!!!', errors:[]});
		}else{
			res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Incorrecto!!!', errors:[]})
		}
};


//GET /quizes/question
exports.question = function(req, res){
	// Modificamos para recuperar las preguntas de base de datos
	models.Quiz.findAll().then(function(quiz){
		res.render('quizes/question',{pregunta: quiz[0].pregunta, errors:[]});
	}); 

	//res.render('quizes/question', {pregunta: 'Capital de Italia'});
};

exports.new = function(req, res){
	var quiz = models.Quiz.build({pregunta:"Pregunta", respuesta:"Respuesta"});
	res.render('quizes/new',{quiz:quiz, errors:[]});

}

// POST /quizes/create
exports.create = function(req, res){
	var quiz = models.Quiz.build(req.body.quiz);
	quiz.validate().then(
		function(err){
			if (err){
				res.render('quizes/new', {quiz: quiz, errors: err.errors});
			}else{
			// Guarda en bbdd los campos pregunta y respuesta de quiz
				quiz.save({fields:["pregunta","respuesta"]}).then(function(){
					res.redirect('/quizes'); // Redirecciona a la lista de preguntas despues de insertar
				});
			}

		}
	);

	
}

