const { Router } = require("express");

const register = require('./register');
const login = require('./login');
const user = require('./user')

// const temperament = require('./temperament');

const router = Router();

router.use('/register', register);
router.use('/login', login);
router.use('/user', user);


// router.use('/temperament', temperament);

module.exports = router;