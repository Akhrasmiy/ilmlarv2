const express = require('express');
const { GetCategory } = require('./_controllers');


const router = express.Router();

router.get('/', GetCategory);
module.exports = router;
