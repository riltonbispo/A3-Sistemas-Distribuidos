import express from 'express';
import { getConsumptionByClient, getLowStockProducts, getMostSoldProducts, getProductsByClient } from '../controllers/adminController.js'

const router = express.Router()

router.get('/most-sold', getMostSoldProducts)
router.get('/products-by-client/:id', getProductsByClient)
router.get('/consumption-client', getConsumptionByClient)
router.get('/low-stock', getLowStockProducts)

export default router