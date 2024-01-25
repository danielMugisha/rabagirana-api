const Resource = require('./controller');
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

router.get('/', Resource.getAll);
router.get('/:resourceId', Resource.getById);

router.post('/', authenticateToken, upload.single('file'), Resource.create);
router.delete('/:resourceId', authenticateToken, Resource.delete);

module.exports = router;