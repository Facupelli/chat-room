const { Router } = require("express");

const register = require('./register');
const login = require('./login');

// const temperament = require('./temperament');

const router = Router();

router.use('/register', register);
router.use('/login', login);

// router.use('/temperament', temperament);

module.exports = router;