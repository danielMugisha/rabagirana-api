const Story = require('./controller');
const express = require('express');
const router = express.Router();
const upload = require('../../middleware/uploads/uploads');
const { authenticateToken } = require('../../middleware/auth/authenticate');

router.get('/', Story.getAll);
router.get('/:storyId', Story.getById);

router.post('/', authenticateToken, upload.single('featuredImage'), Story.create);
router.put('/:storyId', authenticateToken, upload.single('featuredImage'), Story.update);
router.delete('/:storyId', authenticateToken, Story.delete);

module.exports = router;