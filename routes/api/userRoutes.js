const router = require('express').Router();
const { User } = require('../../models');

router.get('/', async(req, res)=>{
    try {

        const user = await User.find({});

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
 
        const user = await User.findById(req.params.id);
 
        if(!user){
            return res.status(404).json('User not found');
        }

        return res.status(200).json(user);

    } catch (error) {
        console.log(error);
        return res.status(500).json('Internal server error');
    }
});

router.post('/', async(req, res)=>{
    const { username, email } = req.body;

    if (!username || !email) {
       return res.status(400).json('Invalid request');
    };

    try {
        const newUser = await User.create({
            username,
            email,
        });

        console.log(newUser);
    } catch (error) {
        if(error.errorResponse.code){
            return res.status(400).json(`This ${Object.keys(error.errorResponse.keyPattern)} already exist`);
        };

        return res.status(500).json('Internal server error');
    }
});

module.exports = router;