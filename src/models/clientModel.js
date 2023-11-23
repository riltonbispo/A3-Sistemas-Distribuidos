const mysql = require('mysql2/promise')

const client = mysql.createPool(process.env.CONNECTION_STRING)


const getClients = async () => {
  try {
    const query = "SELECT * FROM Client;"
    const result = await client.query(query)
    return result[0]
  } catch (err) {
    console.log(`BANCO: Erro ao buscar os clientes: ${err}`)
  }
}

const getOneClient = async (id) => {
  try {
    const query = "SELECT * FROM Client WHERE id=?;"
    const result = await client.query(query, [id])
    return result[0]
  } catch (err) {
    console.log(`BANCO: Erro ao buscar o cliente: ${id}`)
  }
}

const insertClient = async (newClient) => {
  try {
    const query = "INSERT INTO Client(name) VALUES (?);"
    const values = [newClient.name]
    await client.query(query, values)
    console.log(`BANCO: Cliente ${newClient.name} criado com sucesso.`)
  } catch (err) {
    console.error(`BANCO: Erro ao criar o cliente ${newClient.name}: ${err.message}`)
  }
}

const updateClient = async (id, clientData) => {
  try {
    const query = "UPDATE Client SET name=? WHERE ID=?;"
    const values = [clientData.name, id]
    await client.query(query, values)
    console.log(`BANCO: Cliente ${id} atualizado com sucesso.`)
  } catch (err) {
    console.error(`BANCO: Erro ao atualizar o cliente ${clientData.name}: ${err.message}`)
  }
}

const deleteClient = async (id) => {
  try {
    const query = "DELETE FROM Client WHERE ID=?;"
    const values = [id]
    await client.query(query, values)
    console.log(`BANCO: Cliente ${id} deletado com sucesso.`)
  } catch (err) {
    console.error(`BANCO: Erro ao deletar o cliente ${id}: ${err.message}`)
  }
}

module.exports = {
  getClients,
  getOneClient,
  insertClient,
  updateClient,
  deleteClient
}