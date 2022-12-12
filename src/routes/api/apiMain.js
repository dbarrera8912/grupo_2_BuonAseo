const { getTotals } = require('../../controllers/api/apiMainController');

const router = require('express').Router();

/* /api/main */

router
    .get('/getTotals', getTotals)

module.exports = router