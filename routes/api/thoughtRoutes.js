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

module.exports = router;