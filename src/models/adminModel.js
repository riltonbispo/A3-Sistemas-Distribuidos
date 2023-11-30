import { openDb } from "../configDB.js"
const db = await openDb()

export const createMostSoldProductsView = async () => {

  db.run(`
      CREATE VIEW IF NOT EXISTS MostSoldProducts AS
      SELECT
          p.ID AS ProductID,
          p.Name AS ProductName,
          SUM(s.Quantity) AS TotalSold
      FROM
          Sale s
      JOIN
          Product p ON s.Product_ID = p.ID
      GROUP BY
          s.Product_ID;
    `);
}

export const createProductsByClient = async () => {
  try {
    db.run(`
    CREATE VIEW IF NOT EXISTS ProductsByClient AS
    SELECT
        c.ID AS ClientID,
        c.Name AS ClientName,
        p.ID AS ProductID,
        p.Name AS ProductName,
        s.Quantity AS QuantityPurchased
    FROM
        Sale s
    JOIN
        Client c ON s.Client_ID = c.ID
    JOIN
        Product p ON s.Product_ID = p.ID;
  `)
  } catch (error) {
    console.log(error)
  }
}

export const createConsumptionByClient = async () => {
  try {
    db.run(`
      CREATE VIEW IF NOT EXISTS ConsumptionByClient AS
      SELECT
          c.ID AS ClientID,
          c.Name AS ClientName,
          AVG(s.Quantity) AS AverageConsumption
      FROM
          Sale s
      JOIN
          Client c ON s.Client_ID = c.ID
      GROUP BY
          s.Client_ID;
    `)
  } catch (error) {
    console.log(error)
  }
}

export const createLowStockProducts = async () => {
  db.run(`
      CREATE VIEW IF NOT EXISTS LowStockProducts AS
      SELECT
          p.ID AS ProductID,
          p.Name AS ProductName,
          p.Stock AS CurrentStock
      FROM
          Product p
      WHERE
          p.Stock < 10;
    `)
}

export const getMostSoldProducts = async () => {
  try {
    const query = "SELECT * FROM MostSoldProducts ORDER BY TotalSold DESC"
    const result = await db.all(query)
    return result
  } catch (error) {
    console.log(`BANCO: Erro ao obter produtos mais vendidos ${error}`)
  }
}

export const getProductsByClient = async (id) => {
  try {
    const query = "SELECT * FROM ProductsByClient WHERE ClientID = ?"
    const result = await db.all(query, [id])
    return result
  } catch (error) {
    console.log(`BANCO: Erro ao obter produto por client ${error}`)
  }
}

export const getConsumptionByClient = async () => {
  try {
    const query = "SELECT * FROM ConsumptionByClient;"
    const result = await db.all(query)
    return result
  } catch (error) {
    console.log(`BANCO: Erro ao obter consumo medio de clientes ${error}`)
  }
}

export const getLowStockProducts = async () => {
  try {
    const query = "SELECT * FROM LowStockProducts;"
    const result = await db.all(query)
    return result
  } catch (error) {
    console.log(`BANCO: Erro ao obter produtos com baixo estoque ${error}`)
  }
}