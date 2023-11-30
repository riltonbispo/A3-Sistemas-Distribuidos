import {
  getClients,
  getOneClient as oneClient,
  insertClient,
  updateClient as uClient,
  deleteClient as delClient
} from '../models/clientModel.js';

export const getAllClients = async (req, res) => {
  try {
    const result = await getClients()
    res.json(result)
  } catch (err) {
    console.error(`API: Erro ao buscar Clientes: ${err}`)
    res.sendStatus(500)
  }
}

export const getOneClient = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const result = await oneClient(id)
    result ? res.json(result) : res.sendStatus(404)
  } catch (err) {
    console.log(`API: Erro ao buscar Clientes: ${err}`)
    res.sendStatus(500)
  }
}

export const createClient = async (req, res) => {
  try {
    const client = req.body
    await insertClient(client)
    res.sendStatus(201)
  } catch (err) {
    console.log(`API: Erro ao criar client: ${err}`)
    res.sendStatus(500)
  }
}

export const updateClient = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const client = req.body
    await uClient(id, client)
    res.sendStatus(200)
  } catch (err) {
    console.log(`API: Erro ao atualizar Client: ${err}`)
    res.sendStatus(500)
  }
}

export const deleteClient = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    await delClient(id)
    res.sendStatus(204)
  } catch (err) {
    console.log(`API: Erro ao deletar Client: ${err}`)
    res.sendStatus(500)
  }
}