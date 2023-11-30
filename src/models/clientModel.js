import { openDb } from "../configDB.js"
const db = await openDb()

const createTableClient = async () => {
  try {
    db.exec('CREATE TABLE IF NOT EXISTS Client (ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT NOT NULL)')
  } catch (error) {
    console.log(error)
  }
}

export const getClients = async () => {
  try {
    const query = "SELECT * FROM Client;"
    const result = await db.all(query)
    return result
  } catch (err) {
    console.log(`BANCO: Erro ao buscar os clientes: ${err}`)
  }
}

export const getOneClient = async (id) => {
  try {
    const query = "SELECT * FROM Client WHERE id=?;"
    const result = await db.get(query, [id])
    return result
  } catch (err) {
    console.log(`BANCO: Erro ao buscar o cliente: ${id}`)
  }
}

export const insertClient = async (newClient) => {
  try {
    const query = "INSERT INTO Client(name) VALUES (?);"
    const values = [newClient.Name]
    await db.run(query, values)
    console.log(`BANCO: Cliente ${newClient.Name} criado com sucesso.`)
  } catch (err) {
    console.error(`BANCO: Erro ao criar o cliente ${newClient.Name}: ${err.message}`)
  }
}

export const updateClient = async (id, clientData) => {
  try {
    const query = "UPDATE Client SET name=? WHERE ID=?;"
    const values = [clientData.Name, id]
    await db.run(query, values)
    console.log(`BANCO: Cliente ${id} atualizado com sucesso.`)
  } catch (err) {
    console.error(`BANCO: Erro ao atualizar o cliente ${clientData.Name}: ${err.message}`)
  }
}

export const deleteClient = async (id) => {
  try {
    const query = "DELETE FROM Client WHERE ID=?;"
    const values = [id]
    await db.run(query, values)
    console.log(`BANCO: Cliente ${id} deletado com sucesso.`)
  } catch (err) {
    console.error(`BANCO: Erro ao deletar o cliente ${id}: ${err.message}`)
  }
}

export default createTableClient