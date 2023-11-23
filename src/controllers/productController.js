const db = require('../models/productModal')

const getAllProducts = async (req, res) => {
  try {
    const result = await db.getProducts()
    res.json(result)
  } catch (err) {
    console.error(`API: Erro ao buscar Produtos: ${err}`)
    res.sendStatus(500)
  }
}

const getOneProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const result = await db.getOneProduct(id)
    result ? res.json(result) : res.status(404)
  } catch (err) {
    console.log(`API: Erro ao buscar Produto: ${err}`)
    res.sendStatus(500)
  }
}

const createProduct = async (req, res) => {
  try {
    const product = req.body
    await db.insertProduct(product)
    res.sendStatus(201)
  } catch (err) {
    console.log(`API: Erro ao criar produto: ${err}`)
    res.sendStatus(500)
  }
}

const updateProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const product = req.body
    await db.updateProduct(id, product)
    res.sendStatus(200)
  } catch (err) {
    console.log(`API: Erro ao atualizar Produto: ${err}`)
    res.sendStatus(500)
  }
}

const deleteProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    await db.deleteProduct(id)
    res.sendStatus(204)
  } catch (err) {
    console.log(`API: Erro ao deletar Produto: ${err}`)
    res.sendStatus(500)
  }
}

module.exports = {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct
};
