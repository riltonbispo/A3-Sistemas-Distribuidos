import { openDb } from '../configDB.js'
const db = await openDb()

const createTableSale = async () => {
  try {
    db.exec('CREATE TABLE IF NOT EXISTS Sale (' +
      'ID INTEGER PRIMARY KEY AUTOINCREMENT, ' +
      'Client_ID INTEGER, ' +
      'Product_ID INTEGER, ' +
      'Quantity INTEGER NOT NULL, ' +
      'Total NUMERIC(10, 2) NOT NULL, ' +
      'FOREIGN KEY (Client_ID) REFERENCES Client(ID), ' +
      'FOREIGN KEY (Product_ID) REFERENCES Product(ID)' +
      ')');
  } catch (error) {
    console.log(error)
  }
}

export const getSales = async () => {
  try {
    const query = "SELECT * FROM Sale"
    const result = await db.all(query)
    return result
  } catch (err) {
    console.log(`BANCO: Erro ao buscar Sale: ${err}`)
  }
}

export const getOneSale = async (id) => {
  try {
    const query = "SELECT * FROM Sale WHERE id=?"
    const result = await db.get(query, [id])
    return result
  } catch (err) {
    console.log(`BANCO: Erro ao buscar Sale: ${err}`)
  }
}

export const insertSale = async (newSale) => {
  try {
    const insertQuery = `
      INSERT INTO Sale (Client_ID, Product_ID, Quantity, Total)
      VALUES (?, ?, ?, (SELECT Price * ? FROM Product WHERE ID = ?))
    `;
    const insertValues = [
      newSale.Client_ID,
      newSale.Product_ID,
      newSale.Quantity,
      newSale.Quantity,
      newSale.Product_ID,
    ];
    await db.run(insertQuery, insertValues);

    const updateQuery = `
      UPDATE Product SET Stock = Stock - ? WHERE ID = ?
    `;
    const updateValues = [newSale.Quantity, newSale.Product_ID];
    await db.run(updateQuery, updateValues);

    console.log(`BANCO: Venda criada com sucesso.`);
  } catch (err) {
    console.error(`BANCO: Erro ao criar a venda: ${err.message}`);
  }
};

export const updateSale = async (id, saleData) => {
  try {
    const updateQuery = `
      UPDATE Sale
      SET Client_ID=?, Product_ID=?, Quantity=?,
      Total=(SELECT Price * ? FROM Product WHERE ID = ?)
      WHERE ID=?;
    `;
    const updateValues = [
      saleData.Client_ID,
      saleData.Product_ID,
      saleData.Quantity,
      saleData.Quantity,
      saleData.Product_ID,
      id,
    ];
    await db.run(updateQuery, updateValues);

    const updateStockQuery = `
      UPDATE Product SET Stock = Stock - ? WHERE ID = ?
    `;
    const updateStockValues = [saleData.Quantity, saleData.Product_ID];
    await db.run(updateStockQuery, updateStockValues);

    console.log(`BANCO: Venda ${id} atualizada com sucesso.`);
  } catch (err) {
    console.error(`BANCO: Erro ao atualizar a venda ${id}: ${err.message}`);
  }
};


export const deleteSale = async (id) => {
  try {
    const query = "DELETE FROM Sale WHERE ID=?;"
    const values = [id]
    await db.run(query, values)
  } catch (err) {
    console.error(`BANCO: Erro ao deletar o cliente ${id}: ${err}`)
  }
}

export default createTableSale