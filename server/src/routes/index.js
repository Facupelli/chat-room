const { Router } = require("express");

const register = require('./register');
// const temperament = require('./temperament');

const router = Router();

router.use('/register', register);
// router.use('/temperament', temperament);

module.exports = router;