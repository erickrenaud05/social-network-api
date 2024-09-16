const router = require('express').Router();
const { User } = require('../../models');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;


router.get('/', async(req, res)=>{
    try {

        const user = await User.find({}, {_id: false, username: true, email: true});

        if(!user){
            return res.status(404).json('no users found');
        }

        return res.status(200).json(user);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json('Internal server error');
    }
})

router.get('/:id', async(req, res)=>{
    try {
        
        const user = User.find({name: "John"}, {});

        if(!user){
            return res.status(404).json('User not found');
        }

        return res.status(200).json(user);

    } catch (error) {
        console.log(error);
        return res.status(500).json('Internal server error');
    }
})

module.exports = router;