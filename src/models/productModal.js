const mysql = require('mysql2/promise')

const product = mysql.createPool(process.env.CONNECTION_STRING)

const getProducts = async () => {
  try {
    const query = 'SELECT * FROM Product;'
    const result = await product.query(query)
    return result[0]
  } catch (err) {
    console.log(`BANCO: Erro ao buscar os produtos: ${err}`)
  }
}

const getOneProduct = async (id) => {
  try {
    const query = "SELECT * FROM Product WHERE id=?;"
    const result = await product.query(query, [id])
    return result[0]
  } catch (err) {
    console.log(`BANCO: Erro ao buscar o produto: ${id}`)
  }
}

const insertProduct = async (newProduct) => {
  try {
    const query = 'INSERT INTO Product(name, price, stock) VALUES (?, ?, ?)';
    const values = [newProduct.Name, newProduct.Price, newProduct.Stock];
    await product.query(query, values);
    console.log(`BANCO: Produto ${newProduct.Name} criado com sucesso.`);
  } catch (err) {
    console.error(`BANCO: Erro ao criar o produto ${newProduct.Name}: ${err.message}`);
  }
}

const updateProduct = async (id, productData) => {
  try {
    const query = 'UPDATE Product SET name=?, price=?, stock=? WHERE ID=?;'
    const values = [productData.Name, productData.Price, productData.Stock, id]
    await product.query(query, values)
    console.log(`BANCO: Produto ${productData.id} atualizado com sucesso.`)
  } catch (err) {
    console.error(`BANCO: Erro ao atualizar o produto ${productData.Name}: ${err.message}`)
  }
}

const deleteProduct = async (id) => {
  try {
    const query = 'DELETE FROM Product WHERE ID=?;'
    const values = [id]
    await product.query(query, values)
    console.log(`BANCO: Produto ${id} deletado com sucesso.`)
  } catch (err) {
    console.error(`BANCO: Erro ao deletar o produto ${id}: ${err.message}`)
  }
}

module.exports = {
  getProducts,
  getOneProduct,
  insertProduct,
  updateProduct,
  deleteProduct
}
