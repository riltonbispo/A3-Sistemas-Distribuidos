const db = require('../models/saleModal')

const getAllSales = async (req, res) => {
  try {
    const result = await db.getSales()
    res.json(result)
  } catch (err) {
    console.log(`API: Erro ao buscar Sales: ${err}`)
    res.sendStatus(500)
  }
}

const getOneSale = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const result = await db.getOneSale(id)
    result ? res.json(result) : res.sendStatus(404)
  } catch (err) {
    console.log(`API: Erro ao buscar Sale: ${err}`)
    res.sendStatus(500)
  }
}

const createSale = async (req, res) => {
  try {
    const sale = req.body
    await db.insertSale(sale)
    res.sendStatus(201)
  } catch (err) {
    console.log(`API: Erro ao criar Sales: ${err}`)
    res.sendStatus(500)
  }
}

const updateSale = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const sale = req.body
    await db.updateSale(id, sale)
    res.sendStatus(200)
  } catch (err) {
    console.log(`API: Erro ao atualizar Sale: ${err}`)
    res.sendStatus(500)
  }
}

const deleteSale = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    await db.deleteSale(id)
    res.sendStatus(204)
  } catch (err) {
    console.log(`API: Erro ao deletar Sale: ${err}`)
    res.sendStatus(500)
  }
}

module.exports = {
  getAllSales,
  getOneSale,
  createSale,
  updateSale,
  deleteSale
}