const Event = require('./controller');
const express = require('express');
const router = express.Router();
const upload = require('../../middleware/uploads/uploads');
const { authenticateToken } = require('../../middleware/auth/authenticate');

router.get('/', Event.getAll);
router.get('/latest', Event.getLastThree);
router.get('/:eventId', Event.getById);

router.post('/', authenticateToken, upload.fields([
    { name: 'featuredImage', maxCount: 1 }, 
    { name: 'featuredPdf', maxCount: 1 }
]), Event.create);

router.put('/:eventId', authenticateToken, upload.fields([
    { name: 'featuredImage', maxCount: 1 }, 
    { name: 'featuredPdf', maxCount: 1 }
]), Event.update);

router.delete('/:eventId', authenticateToken, Event.delete);

module.exports = router;