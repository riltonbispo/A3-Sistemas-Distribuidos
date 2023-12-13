import sqlite3 from "sqlite3"
import { open } from "sqlite"
import { Sequelize } from "sequelize"

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.db'
})

export const openDb = async () => {
  return open({
    filename: './database.db',
    driver: sqlite3.Database
  })
}