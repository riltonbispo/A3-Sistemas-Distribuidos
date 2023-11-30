import express from 'express';
import { getAllClients, getOneClient, createClient, updateClient, deleteClient } from '../controllers/clientController.js';

const router = express.Router();

router.get('/', getAllClients);
router.get('/:id', getOneClient);
router.post('/', createClient);
router.patch('/:id', updateClient);
router.delete('/:id', deleteClient);

export default router;