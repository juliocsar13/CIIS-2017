var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');
var postMasterController = require('../controllers/postMasterController');
var imagenController = require('../controllers/imagenController');
var assistController = require('../controllers/assistController');
var typeController = require('../controllers/typeController');
var paymentController = require('../controllers/paymentController');

var Type = require('../collections/type');

var mailController = require('../controllers/mail');

/* GET home page. */
router.get('/', function(req, res, next) {
  Type.find({})
  .exec(function (err,type) {
    if(err) return res.sendStatus(503);
    res.render('index', { types: type });
  });
});

router.route('/preregistro')
        .get(userController.createView)
        .post(userController.register);



router.route('/checkemail').get(userController.emailCheck);
router.route('/checkdni').get(userController.dniCheck);
router.route('/lista')
          .get(userController.listUser);
router.route('/asistencia')
          .get(assistController.create);
router.route('/lista_asistencia')
        .get(assistController.getAssist);
router.route('/dias')
        .get(assistController.getDay);
router.route('/Dasist')
        .get(assistController.deleteAssist);

router.route('/pagos')
          .post(paymentController.create);
router.route('/Lpagos')
          .get(paymentController.getPayment);
router.route('/Dpagos')
        .get(paymentController.deletePayment);

router.route('/type')
          .post(typeController.create);
router.route('/Dtype')
          .get(typeController.deleteType);

router.route('/postmaster/photo').post(imagenController.create);
router.route('/getPhotos').get(imagenController.getPhotos);


router.route('/.well-known/acme-challenge/:zf2uIh7KIBEFFrKnxQY1jBGH5xEYlY2E6BAz0dMKx6s')
		.get(userController.sslController1)

router.route('/.well-known/acme-challenge/:ziWr--RAg3dYNucCUNNHMJt0nzN5KBueFLRBKI6_K84')
		.get(userController.sslController2)


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
