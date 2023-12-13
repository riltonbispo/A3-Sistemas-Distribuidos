import { DataTypes } from "sequelize";
import { sequelize } from "../configDB.js"

export const Client = sequelize.define('Client', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
})

export const getClients = async () => {
  try {
    const clients = await Client.findAll();
    return clients;
  } catch (err) {
    console.log(`BANCO: Erro ao buscar os clientes: ${err}`)
  }
}

export const getOneClient = async (id) => {
  try {
    const client = await Client.findOne({
      where: {
        ID: id,
      },
    });
    return client;
  } catch (err) {
    console.log(`BANCO: Erro ao buscar o cliente: ${id}`)
  }
}

export const insertClient = async (newClient) => {
  try {
    await Client.create({
      Name: newClient.Name
    })
    console.log(`BANCO: Cliente ${newClient.Name} criado com sucesso.`)
  } catch (err) {
    console.error(`BANCO: Erro ao criar o cliente ${newClient.Name}: ${err.message}`)
  }
}

export const updateClient = async (id, clientData) => {
  try {
    await Client.update({ Name: clientData.Name }, {
      where: {
        ID: id
      }
    })
    console.log(`BANCO: Cliente ${id} atualizado com sucesso.`)
  } catch (err) {
    console.error(`BANCO: Erro ao atualizar o cliente ${clientData.Name}: ${err.message}`)
  }
}

export const deleteClient = async (id) => {
  try {
    await Client.destroy({
      where: {
        ID: id
      }
    })
    console.log(`BANCO: Cliente ${id} deletado com sucesso.`)
  } catch (err) {
    console.error(`BANCO: Erro ao deletar o cliente ${id}: ${err.message}`)
  }
}