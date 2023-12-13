import express from 'express';
import { getAllSales, getOneSale, createSale, deleteSale } from '../controllers/saleController.js';

const router = express.Router();

router.get('/', getAllSales);
router.get('/:id', getOneSale);
router.post('/', createSale);
router.delete('/:id', deleteSale);

export default router;