const router = require('express').Router();
const { User, Thought } = require('../../models');

router.get('/', async(req, res)=>{
    try {
        const allThoughts = await Thought.find({});

        if(!allThoughts){
            return res.status(404).json('No thoughts found');
        };

        return res.status(200).json(allThoughts);
    } catch (error) {
        return res.status(500).json('Internal server error');
    }
});

router.get('/:id', async(req, res)=>{
    try {
        const singleThought = await Thought.findById(req.params.id);

        if(!singleThought){
            return res.status(404).json('Thought not found');
        };

        return res.status(200).json(singleThought);
    } catch (error) {
        return res.status(500).json('Internal server error');
    }
});

router.post('/', async(req, res)=>{
    const { thoughtText, userId } = req.body;

    if(!thoughtText || !userId){
        return res.status(400).json('Invalid request');
    };

    try {
        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json('User not found');
        };

        const newThought = await Thought.create({
            thoughtText,
            username: user.username
        });

        user.thoughts.push(newThought.id);

        user.save();

        return res.status(200).json(user);

    } catch (error) {
        return res.status(500).json('Internal server error');
    }
});

router.put('/:id', async(req, res)=>{
    const updatedValue = req.body.thoughtText;

    if(!updatedValue || !req.params.id){
        return res.status(400).json('invalid request');
    };

    try {
        const updatedThought = await Thought.findByIdAndUpdate(req.params.id, {thoughtText: updatedValue}, {new: true, runValidators: true});

        if(!updatedThought){
            return res.status(404).json('No thought found');
        }

        return res.status(201).json(updatedThought);
    } catch (error) {
        return res.status(400).json(error);
    };
});

module.exports = router;