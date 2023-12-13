import express from 'express'
import clientRoutes from './routes/clientRoutes.js'
import productRoutes from './routes/productRoutes.js'
import saleRoutes from './routes/saleRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import { Client } from './models/clientModel.js'
import { Product } from './models/productModel.js'
import createTableSale from './models/saleModel.js'
import {
  createConsumptionByClient,
  createLowStockProducts,
  createMostSoldProductsView,
  createProductsByClient
} from './models/adminModel.js'
import { sequelize } from './configDB.js'

const PORT = 3000;
const app = express()
app.use(express.json())

const syncDatabase = async () => {
  try {
    await sequelize.sync()
    console.log('Dados sincronizados')
  } catch (error) {
    console.log('Erro ao sincronizar dados:', error)
  }
}
createTableSale()
createConsumptionByClient()
createLowStockProducts()
createMostSoldProductsView()
createProductsByClient()

app.use('/clients', clientRoutes);
app.use('/products', productRoutes);
app.use('/sales', saleRoutes);
app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
  res.json({
    message: "Bem Vindo a API A3 De Sistemas Distribuidos"
  })
})

const startServer = async () => {
  await syncDatabase()
  app.listen(PORT, () => {
    console.log(`API Rodando na porta ${PORT}`);
  });
}

startServer()