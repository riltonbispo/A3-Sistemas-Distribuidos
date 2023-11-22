require('dotenv').config()
const express = require('express')
const clientRoutes = require('./routes/clientRoutes')

const app = express()

// cofigura o bory para JSON
app.use(express.json())

app.use('/clients', clientRoutes);

app.get('/', (req, res) => {
  res.json({
    message: "Bem Vindo a API A3 De Sistemas Distribuidos"
  })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Rodando na porta ${PORT}`);
});