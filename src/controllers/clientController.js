const db = require('../models/clientModel')

const getAllClients = async (req, res) => {
  try {
    const result = await db.getClients()
    res.json(result)
  } catch (err) {
    console.error(`API: Erro ao buscar Clientes: ${err}`)
    res.sendStatus(500)
  }
}

const getOneClient = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const result = await db.getOneClient(id)
    result ? res.json(result) : res.sendStatus(404)
  } catch (err) {
    console.log(`API: Erro ao buscar Clientes: ${err}`)
    res.sendStatus(500)
  }
}

const createClient = async (req, res) => {
  try {
    const client = req.body
    await db.insertClient(client)
    res.sendStatus(201)
  } catch (err) {
    console.log(`API: Erro ao criar client: ${err}`)
    res.sendStatus(500)
  }
}

const updateClient = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const client = req.body
    await db.updateClient(id, client)
    res.sendStatus(200)
  } catch (err) {
    console.log(`API: Erro ao atualizar Client: ${err}`)
    res.sendStatus(500)
  }
}

const deleteClient = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    await db.deleteClient(id)
    res.sendStatus(204)
  } catch (err) {
    console.log(`API: Erro ao deletar Client: ${err}`)
    res.sendStatus(500)
  }
}

module.exports = {
  getAllClients,
  getOneClient,
  createClient,
  updateClient,
  deleteClient
};