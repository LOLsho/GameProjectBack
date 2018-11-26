const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth');

router.post('/sign-in', controller.signIn);
router.post('/sign-up', controller.signUp);


module.exports = router;