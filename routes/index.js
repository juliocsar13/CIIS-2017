var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.route('/preregistro')
        .get(userController.createView)
        .post(userController.register);

router.route('/usuarios')
        .get(userController.getUsers);
router.route('/Dusuarios')
        .get(userController.deleteUsers);
module.exports = router;
