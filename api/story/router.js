const Story = require('./controller');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const upload = require('../../middleware/uploads/uploads');

const authenticateToken = (req, res, next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

router.get('/', Story.getAll);
router.get('/:storyId', Story.getById);

router.post('/', authenticateToken, upload.single('featuredImage'), Story.create);
router.put('/:storyId', authenticateToken, upload.single('featuredImage'), Story.update);
router.delete('/:storyId', authenticateToken, Story.delete);



module.exports = router;