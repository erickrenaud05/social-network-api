const router = require('express').Router();
const { User, Thought } = require('../../models');

router.get('/', async(req, res)=>{
    try {

        const user = await User.find({}).select('-__v');

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
 
        const user = await User.findById(req.params.id).select('-__v').populate('thoughts friends', '-__v');
 
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

        return res.status(200).json(newUser);

    } catch (error) {
        if(error.code === 11000){
            return res.status(400).json(`This ${Object.keys(error.errorResponse.keyPattern)} already exist`);
        };

        return res.status(500).json('Internal server error');
    }
});

router.put('/:id', async(req, res)=>{

    const updatedValues = req.body;

    if(!updatedValues || !req.params.id){
        return res.status(400).json('invalid request');
    };

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedValues, {new: true, runValidators: true});

        if(!updatedUser){
            return res.status(404).json('No user found');
        }

        return res.status(201).json(updatedUser);
    } catch (error) {
        return res.status(400).json(error);
    };
});

router.delete('/:id', async(req, res)=>{
    if(!req.params.id){
        return res.status(400).json('Invalid request');
    };

    try {
        //delete thoughts first 
        const deletedThoughts = await Thought.deleteMany({
            _id: req.params.id,
        });

        if(!deletedThoughts){
            throw new Error('Internal server error');
        }

        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if(!deletedUser){
            return res.status(404).json('No user found');
        };

        return res.status(201).json(`Successfully deleted user and ${deletedThoughts.deletedCount} thoughts associated with user`);
    } catch (error) {
        return res.status(500).json('Internal server errors');
    }
});

router.post('/:id/friends/:friendId', async(req, res)=>{
    if(!req.params.id || !req.params.friendId){
        return res.status(400).json('Invalid request');
    };

    if(req.params.id === req.params.friendId){
        return res.status(400).json('Cannot add self as friend');
    }

    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $addToSet: {friends: req.params.friendId} },
            {new: true, runValidators: true},            
        )

        if(!user){
            return res.status(404).json('User not found');
        };


        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json('Internal server error');
    }
});

router.delete('/:id/friends/:friendId', async(req, res)=>{
    if(!req.params.id || !req.params.friendId){
        return res.status(400).json('Invalid request');
    };

    
    try {
        const user = await User.findByIdAndUpdate(req.params.id,
            { $pull: {friends: req.params.friendId}},
            { new: true },
        );

        if(!user){
            return res.status(404).json('User not found');
        };

        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json('Internal server error');
    }
});

module.exports = router;