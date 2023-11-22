const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

router.get('/', clientController.getAllClients);
router.get('/:id', clientController.getOneClient);
router.post('/', clientController.createClient);
router.patch('/:id', clientController.updateClient);
router.delete('/:id', clientController.deleteClient);

module.exports = router;