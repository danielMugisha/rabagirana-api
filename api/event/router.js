const Event = require('./controller');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

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

router.get('/', Event.getAll);
router.get('/latest', Event.getLastThree);
router.get('/:eventId', Event.getById);

router.post('/', authenticateToken, Event.create);
router.put('/:eventId', authenticateToken, Event.update);
router.delete('/:eventId', authenticateToken, Event.delete);



module.exports = router;