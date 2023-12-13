import {
  getSales,
  getOneSale as oneSale,
  insertSale,
  deleteSale as delSale
} from '../models/saleModel.js';


export const getAllSales = async (req, res) => {
  try {
    const result = await getSales()
    res.json(result)
  } catch (err) {
    console.log(`API: Erro ao buscar Sales: ${err}`)
    res.sendStatus(500)
  }
}

export const getOneSale = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const result = await oneSale(id)
    result ? res.json(result) : res.sendStatus(404)
  } catch (err) {
    console.log(`API: Erro ao buscar Sale: ${err}`)
    res.sendStatus(500)
  }
}

export const createSale = async (req, res) => {
  try {
    const sale = req.body
    await insertSale(sale)
    res.sendStatus(201)
  } catch (err) {
    console.log(`API: Erro ao criar Sales: ${err}`)
    res.sendStatus(500)
  }
}

export const deleteSale = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    await delSale(id)
    res.sendStatus(204)
  } catch (err) {
    console.log(`API: Erro ao deletar Sale: ${err}`)
    res.sendStatus(500)
  }
}
