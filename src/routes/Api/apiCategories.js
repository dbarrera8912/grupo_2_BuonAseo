// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const {list} = require('../../controllers/Api/apiCategoriesController');

// /api/categories

router
    .get('/', list)

module.exports = router;