const router = require('express').Router();
const { User } = require('../models');

router.get('/', async(req, res)=>{
    const user = await User.find({});

    res.send(user);
})

module.exports = router;