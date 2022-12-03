const { getTotals } = require('../../controllers/Api/apiMainController');

const router = require('express').Router();

/* /api/main */

router
    .get('/getTotals', getTotals)

module.exports = router