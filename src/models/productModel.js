import { sequelize } from "../configDB.js";
import { DataTypes } from "sequelize";

export const Product = sequelize.define('Product', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  Price: {
    type: DataTypes.NUMERIC(10, 2),
    defaultValue: null,
  },
  Stock: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
});

export const getProducts = async () => {
  try {
    const products = await Product.findAll();
    return products;
  } catch (err) {
    console.log(`BANCO: Erro ao buscar os produtos: ${err}`)
  }
}

export const getOneProduct = async (id) => {
  try {
    const product = await Product.findOne({
      where: {
        ID: id,
      },
    });
    return product;
  } catch (err) {
    console.log(`BANCO: Erro ao buscar o produto: ${id}`)
  }
}

export const insertProduct = async (newProduct) => {
  try {
    const createdProduct = await Product.create({
      Name: newProduct.Name,
      Price: newProduct.Price,
      Stock: newProduct.Stock,
    });

    console.log(`BANCO: Produto ${createdProduct.Name} criado com sucesso.`);
    return createdProduct;
  } catch (err) {
    console.error(`BANCO: Erro ao criar o produto ${newProduct.Name}: ${err.message}`);
  }
}

export const updateProduct = async (id, productData) => {
  try {
    await Product.update(
      {
        Name: productData.Name,
        Price: productData.Price,
        Stock: productData.Stock,
      },
      {
        where: {
          ID: id,
        },
      }
    )
    console.log(`BANCO: Produto ${productData.id} atualizado com sucesso.`)
  } catch (err) {
    console.error(`BANCO: Erro ao atualizar o produto ${productData.Name}: ${err.message}`)
  }
}

export const deleteProduct = async (id) => {
  try {
    await Product.destroy({
      where: {
        ID: id
      }
    })
    console.log(`BANCO: Produto ${id} deletado com sucesso.`)
  } catch (err) {
    console.error(`BANCO: Erro ao deletar o produto ${id}: ${err.message}`)
  }
}