const Resource = require('./controller');
const express = require('express');
const router = express.Router();
const upload = require('../../middleware/uploads/uploads');
const { authenticateToken } = require('../../middleware/auth/authenticate');

router.get('/', Resource.getAll);
router.get('/:resourceId', Resource.getById);

router.post('/', authenticateToken, upload.single('file'), Resource.create);
router.delete('/:resourceId', authenticateToken, Resource.delete);

module.exports = router;