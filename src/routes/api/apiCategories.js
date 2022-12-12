// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const {list,listCount} = require('../../controllers/api/apiCategoriesController');

// /api/categories

router
    .get('/', list)
    .get('/listCount', listCount)

module.exports = router;