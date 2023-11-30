import { openDb } from "../configDB.js"
const db = await openDb()

const createProductTable = async () => {
  try {
    db.exec('CREATE TABLE IF NOT EXISTS Product (' +
      'ID INTEGER PRIMARY KEY AUTOINCREMENT, ' +
      'Name TEXT NOT NULL, ' +
      'Price NUMERIC(10, 2) DEFAULT NULL, ' +
      'Stock INTEGER DEFAULT NULL' +
      ')');
  } catch (error) {
    console.log(error)
  }
}

export const getProducts = async () => {
  try {
    const query = 'SELECT * FROM Product;'
    const result = await db.all(query)
    return result
  } catch (err) {
    console.log(`BANCO: Erro ao buscar os produtos: ${err}`)
  }
}

export const getOneProduct = async (id) => {
  try {
    const query = "SELECT * FROM Product WHERE id=?;"
    const result = await db.get(query, [id])
    return result
  } catch (err) {
    console.log(`BANCO: Erro ao buscar o produto: ${id}`)
  }
}

export const insertProduct = async (newProduct) => {
  try {
    const query = 'INSERT INTO Product(name, price, stock) VALUES (?, ?, ?)';
    const values = [newProduct.Name, newProduct.Price, newProduct.Stock];
    await db.run(query, values);
    console.log(`BANCO: Produto ${newProduct.Name} criado com sucesso.`);
  } catch (err) {
    console.error(`BANCO: Erro ao criar o produto ${newProduct.Name}: ${err.message}`);
  }
}

export const updateProduct = async (id, productData) => {
  try {
    const query = 'UPDATE Product SET name=?, price=?, stock=? WHERE ID=?;'
    const values = [productData.Name, productData.Price, productData.Stock, id]
    await db.run(query, values)
    console.log(`BANCO: Produto ${productData.id} atualizado com sucesso.`)
  } catch (err) {
    console.error(`BANCO: Erro ao atualizar o produto ${productData.Name}: ${err.message}`)
  }
}

export const deleteProduct = async (id) => {
  try {
    const query = 'DELETE FROM Product WHERE ID=?;'
    const values = [id]
    await db.run(query, values)
    console.log(`BANCO: Produto ${id} deletado com sucesso.`)
  } catch (err) {
    console.error(`BANCO: Erro ao deletar o produto ${id}: ${err.message}`)
  }
}

export default createProductTable