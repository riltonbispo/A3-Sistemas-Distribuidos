const mysql = require('mysql2/promise')

const sale = mysql.createPool(process.env.CONNECTION_STRING)


const getSales = async () => {
  try {
    const query = "SELECT * FROM Sale"
    const result = await sale.query(query)
    return result[0]
  } catch (err) {
    console.log(`BANCO: Erro ao buscar Sale: ${err}`)
  }
}

const getOneSale = async (id) => {
  try {
    const query = "SELECT * FROM Sale WHERE id=?"
    const result = await sale.query(query, [id])
    return result[0]
  } catch (err) {
    console.log(`BANCO: Erro ao buscar Sale: ${err}`)
  }
}

const insertSale = async (newSale) => {
  const connection = await sale.getConnection();
  try {
    await connection.beginTransaction();

    const insertQuery = "INSERT INTO Sale (Client_ID, Product_ID, Quantity, Total) VALUES (?, ?, ?, (SELECT Price * ? FROM Product WHERE ID = ?))";
    const insertValues = [newSale.Client_ID, newSale.Product_ID, newSale.Quantity, newSale.Quantity, newSale.Product_ID];
    await connection.query(insertQuery, insertValues);

    const updateQuery = "UPDATE Product SET Stock = Stock - ? WHERE ID = ?";
    const updateValues = [newSale.Quantity, newSale.Product_ID];
    await connection.query(updateQuery, updateValues);

    await connection.commit();
    console.log(`BANCO: Venda criada com sucesso.`);
  } catch (err) {
    await connection.rollback();
    console.error(`BANCO: Erro ao criar a venda: ${err.message}`);
  } finally {
    connection.release()
  }
}

const updateSale = async (id, saleData) => {
  const connection = await sale.getConnection();

  try {
    await connection.beginTransaction();

    const updateQuery = "UPDATE Sale SET Client_ID=?, Product_ID=?, Quantity=?, Total=(SELECT Price * ? FROM Product WHERE ID = ?) WHERE ID=?;";
    const updateValues = [saleData.Client_ID, saleData.Product_ID, saleData.Quantity, saleData.Quantity, saleData.Product_ID, id];
    await sale.query(updateQuery, updateValues);

    const updateStockQuery = "UPDATE Product SET Stock = Stock - ? WHERE ID = ?";
    const updateStockValues = [saleData.Quantity, id, saleData.Product_ID];
    await sale.query(updateStockQuery, updateStockValues);

    await connection.commit();
    console.log(`BANCO: Venda ${id} atualizada com sucesso.`);
  } catch (err) {
    console.error(`BANCO: Erro ao atualizar a venda ${id}: ${err.message}`);
  } finally {
    connection.release()
  }
}

const deleteSale = async (id) => {

  try {
    const query = "DELETE FROM Sale WHERE ID=?;"
    const values = [id]
    await sale.query(query, values)
  } catch (err) {
    console.error(`BANCO: Erro ao deletar o cliente ${id}: ${err}`)
  }
}

module.exports = {
  getSales,
  getOneSale,
  insertSale,
  deleteSale,
  updateSale
}