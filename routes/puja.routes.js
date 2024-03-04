const express = require('express')
const pujaController = require('../controller/puja.controller')
const router = express.Router();

const upload = require("../middleware/upload.middleware")

router.route('/puja')
    .post(upload.single('image'),pujaController.CreatePuja)
    .get(pujaController.GetAllPuja);

router.route('/puja/:id')
    .get(pujaController.GetSinglePuja)
    .delete(pujaController.DeletePuja)

router.route('/selected/puja/:id')
    .post(upload.none(),pujaController.SelectedPujaList)
    .get(pujaController.GetSelectedPujaList)
// ---------------------------------------

module.exports = router;