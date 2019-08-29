const express = require('express');

const router = express.Router();

router.get('/test',(req, res,next) => {
    res.json({mas:'login works'});
});

module.exports = router;