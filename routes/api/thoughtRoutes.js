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
    const { thoughtText, username } = req.body;

    if(!thoughtText || !username){
        return res.status(400).json('Invalid request');
    };

    try {   
        const user = await User.findOne({
            username,
        });

        if(!user){
            return res.status(404).json('User not found')
        };

        const newThought = await Thought.create({
            thoughtText,
            username,
        });

        user.thoughts.push(newThought);
        await user.save();

        return res.status(200).json(newThought);

    } catch (error) {
        return res.status(500).json(`Internal server error, ${error}`);
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

router.delete('/:id', async(req, res)=>{
    if(!req.params.id){
        return res.status(400).json('Invalid request');
    };

    try {

        const deletedThought = await Thought.findByIdAndDelete(req.params.id);

        if(!deletedThought){
            return res.status(404).json('No user found');
        };

        return res.status(201).json(`Successfully deleted thought with id of ${req.params.id} by ${deletedThought.username}`);
    } catch (error) {
        return res.status(500).json('Internal server errors');
    }
});

router.post('/:id/reactions', async(req, res)=>{
    const newReaction = req.body;

    if(!req.params.id || !newReaction){
        return res.status(404).json('Invalid request');
    };

    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.id,
            {$addToSet: {reactions: newReaction}},
            {new: true, runValidators: true}
        );

        if(!thought){
            return res.status(404).json('Thought not found')
        };
          
        return res.status(201).json(thought);
    } catch (error) {
        return res.status(500).json(`Internal server error, ${error}`);
    }
});

router.delete('/:id/reactions/:reactionId', async(req,res)=>{
    if(!req.params.id || !req.params.reactionId){
        return res.status(400).json('Invalid request');
    };

    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.id,
            { $pull: {reactions: {reactionId: req.params.reactionId}} },
            {new: true},
        );

        if(!thought){
            return res.status(404).json('Thought not found');
        };

        return res.status(201).json(thought);
    } catch (error) {
        return res.status(500).json(`Internal server error, ${error}`);
    }
});

module.exports = router;