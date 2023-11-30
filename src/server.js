import express from 'express'
import clientRoutes from './routes/clientRoutes.js'
import productRoutes from './routes/productRoutes.js'
import saleRoutes from './routes/saleRoutes.js'
import createTableClient from './models/clientModel.js'
import createProductTable from './models/productModel.js'
import createTableSale from './models/saleModel.js'

const app = express()

// cofigura o bory para JSON
app.use(express.json())

createTableClient()
createTableSale()
createProductTable()

app.use('/clients', clientRoutes);
app.use('/products', productRoutes);
app.use('/sales', saleRoutes);

app.get('/', (req, res) => {
  res.json({
    message: "Bem Vindo a API A3 De Sistemas Distribuidos"
  })
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API Rodando na porta ${PORT}`);
});