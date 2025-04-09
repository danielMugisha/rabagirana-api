const Manna = require('./controller');
const express = require('express');
const router = express.Router();
const upload = require('../../middleware/uploads/uploads');
const { authenticateToken } = require('../../middleware/auth/authenticate');

router.get('/', Manna.getAll);
router.get('/latest', Manna.getLatest);
router.get('/:mannaId', Manna.getById);

router.post('/', authenticateToken, upload.single('featuredImage'), Manna.create);
router.put('/:mannaId', authenticateToken, upload.single('featuredImage'), Manna.update);
router.delete('/:mannaId', authenticateToken, Manna.delete);

module.exports = router;