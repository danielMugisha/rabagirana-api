const Manna = require('./controller');
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

router.get('/', Manna.getAll);
router.get('/latest', Manna.getLatest);
router.get('/:mannaId', Manna.getById);

router.post('/', authenticateToken, upload.single('featuredImage'), Manna.create);
router.put('/:mannaId', authenticateToken, upload.single('featuredImage'), Manna.update);
router.delete('/:mannaId', authenticateToken, Manna.delete);



module.exports = router;