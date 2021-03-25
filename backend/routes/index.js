const express = require('express');
const router = express.Router();


router.get('/test/site', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.send('Test Successful!');
});

module.exports = router;