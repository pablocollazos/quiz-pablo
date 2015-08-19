var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

//Autoload de comandos con :quizId
// Solo se ejecuta esto si en la URL llega quizId
router.param('quizId', quizController.load);

// Incluimos rutas para pregunta y respuesta
router.get('/quizes', 						quizController.index);
router.get('/quizes/:quizId(\\d+)', 		quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', 	quizController.answer);
router.get('/quizes/new', 					quizController.new);
router.post('/quizes/create', 				quizController.create);



// router.get('/quizes/question', quizController.question);
// router.get('/quizes/answer', quizController.answer);
router.get('/author', function(req, res){
	res.render('author');
})
module.exports = router;
