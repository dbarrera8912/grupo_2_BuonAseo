// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const {list,listCount} = require('../../controllers/Api/apiCategoriesController');

// /api/categories

router
    .get('/', list)
    .get('/listCount', listCount)

module.exports = router;