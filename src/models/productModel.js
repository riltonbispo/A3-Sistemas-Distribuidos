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

export const seedProducts = async () => {
  try {
    const Products = [
      { Name: "Smartphone Galaxy S21", Price: 899.99, Stock: 50 },
      { Name: "Laptop Dell XPS 13", Price: 1299.99, Stock: 30 },
      { Name: "Sony 55-inch 4K Smart TV", Price: 999.99, Stock: 20 },
      { Name: "Bose QuietComfort 35 II Headphones", Price: 299.99, Stock: 40 },
      { Name: "Canon EOS Rebel T7i DSLR Camera", Price: 749.99, Stock: 15 },
      { Name: "Apple iPad Air", Price: 599.99, Stock: 25 },
      { Name: "Samsung 1TB SSD", Price: 149.99, Stock: 60 },
      { Name: "Nintendo Switch Console", Price: 299.99, Stock: 10 },
      { Name: "LG 27-inch 4K Monitor", Price: 399.99, Stock: 18 },
      { Name: "Dyson V11 Cordless Vacuum", Price: 499.99, Stock: 12 },
      { Name: "Fitbit Charge 4 Fitness Tracker", Price: 129.99, Stock: 35 },
      { Name: "Microsoft Surface Pro 7", Price: 899.99, Stock: 22 },
      { Name: "Beats Studio3 Wireless Headphones", Price: 349.99, Stock: 30 },
      { Name: "KitchenAid Stand Mixer", Price: 349.99, Stock: 15 },
      { Name: "Garmin Forerunner 245 GPS Watch", Price: 299.99, Stock: 25 },
    ];

    const existingProducts = await Product.findAll();

    if (existingProducts.length === 0) {
      await Product.bulkCreate(Products);
      console.log('Banco de dados sincronizado e 10 clientes criados');
    }

  } catch (err) {
    console.error(`BANCO: Error seeding products: ${err.message}`);
  }
};

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