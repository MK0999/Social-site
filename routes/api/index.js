const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughts = require('./thoughts');


router.use('/users', userRoutes);
router.use('/thoughts', thoughts);
module.exports = router;
