var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');
var postMasterController = require('../controllers/postMasterController');

var mailController = require('../controllers/mail');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.route('/preregistro')
        .get(userController.createView)
        .post(userController.register);

router.route('/postmaster/preregistro')
          .post(postMasterController.register);
router.route('/postmaster/Dusuarios')
          .get(postMasterController.deleteUsers);
router.route('/postmaster/list')
          .get(postMasterController.checkReniec);
router.route('/postmaster/usuarios')
          .get(postMasterController.getUsers);

router.post('/contacto', mailController.contact);

router.route('/usuarios')
        .get(userController.getUsers);
router.route('/Dusuarios')
        .get(userController.deleteUsers);

router.route('/postmaster')
		.get(postMasterController.createView)
module.exports = router;
