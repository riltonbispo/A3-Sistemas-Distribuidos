import {
  getProducts,
  getOneProduct as oneProduct,
  insertProduct,
  updateProduct as uProduct,
  deleteProduct as delProduct
} from '../models/productModel.js';

export const getAllProducts = async (req, res) => {
  try {
    const result = await getProducts()
    res.json(result)
  } catch (err) {
    console.error(`API: Erro ao buscar Produtos: ${err}`)
    res.sendStatus(500)
  }
}

export const getOneProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const result = await oneProduct(id)
    result ? res.json(result) : res.status(404)
  } catch (err) {
    console.log(`API: Erro ao buscar Produto: ${err}`)
    res.sendStatus(500)
  }
}

export const createProduct = async (req, res) => {
  try {
    const product = req.body
    await insertProduct(product)
    res.sendStatus(201)
  } catch (err) {
    console.log(`API: Erro ao criar produto: ${err}`)
    res.sendStatus(500)
  }
}

export const updateProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const product = req.body
    await uProduct(id, product)
    res.sendStatus(200)
  } catch (err) {
    console.log(`API: Erro ao atualizar Produto: ${err}`)
    res.sendStatus(500)
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    await delProduct(id)
    res.sendStatus(204)
  } catch (err) {
    console.log(`API: Erro ao deletar Produto: ${err}`)
    res.sendStatus(500)
  }
}
