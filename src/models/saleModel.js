import { openDb } from '../configDB.js'
const db = await openDb()
import { DataTypes } from "sequelize";
import { sequelize } from '../configDB.js';
import { Client } from './clientModel.js';
import { Product } from './productModel.js';

export const Sale = sequelize.define('Sale', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Client_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Client,
      key: 'ID',
    },
  },
  Product_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'ID',
    },
  },
  Quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Total: {
    type: DataTypes.NUMERIC(10, 2),
    allowNull: false,
  },
});

Sale.belongsTo(Client, { foreignKey: 'Client_ID' });
Sale.belongsTo(Product, { foreignKey: 'Product_ID' });

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const seedSales = async () => {
  try {
    const sales = Array.from({ length: 10 }, () => ({
      Client_ID: getRandomInt(1, 11), 
      Product_ID: getRandomInt(1, 16),
      Quantity: getRandomInt(1, 8),
    }));

    const existingSales = await Sale.findAll();

    if (existingSales.length === 0) {
      for (const sale of sales) {
        const product = await Product.findByPk(sale.Product_ID);
        if (product) {
          sale.Total = sale.Quantity * product.Price;
        }
      }

      await Sale.bulkCreate(sales);
      console.log('Banco de dados sincronizado e 10 vendas criadas com sucesso.');
    }

  } catch (err) {
    console.error(`BANCO: Erro ao criar as vendas: ${err.message}`);
  }
};

export const getSales = async () => {
  try {
    const sales = await Sale.findAll();
    return sales;
  } catch (err) {
    console.log(`BANCO: Erro ao buscar Sale: ${err}`)
  }
}

export const getOneSale = async (id) => {
  try {
    const sale = await Sale.findOne({
      where: {
        ID: id,
      },
    });
    return sale;
  } catch (err) {
    console.log(`BANCO: Erro ao buscar Sale: ${err}`)
  }
}

export const insertSale = async (newSale) => {
  const t = await sequelize.transaction();

  try {
    const createdSale = await Sale.create({
      Client_ID: newSale.Client_ID,
      Product_ID: newSale.Product_ID,
      Quantity: newSale.Quantity,
      Total: newSale.Quantity * (await Product.findByPk(newSale.Product_ID)).Price,
    }, { transaction: t });

    await Product.update(
      { Stock: sequelize.literal(`Stock - ${newSale.Quantity}`) },
      { where: { ID: newSale.Product_ID }, transaction: t }
    );

    await t.commit();

    console.log(`BANCO: Venda criada com sucesso.`);
    return createdSale;
  } catch (err) {
    await t.rollback();
    console.error(`BANCO: Erro ao criar a venda: ${err.message}`);
  }
};


export const deleteSale = async (id) => {
  const t = await sequelize.transaction();
  try {
    const saleToDelete = await Sale.findByPk(id);
    await Sale.destroy({
      where: {
        ID: id
      },
      transaction: t
    });

    await Product.update(
      { Stock: sequelize.literal(`Stock + ${saleToDelete.Quantity}`) },
      { where: { ID: saleToDelete.Product_ID }, transaction: t }
    );

    await t.commit();

    console.log(`BANCO: Venda ${id} deletada com sucesso.`);
  } catch (err) {
    console.error(`BANCO: Erro ao deletar o cliente ${id}: ${err}`)
  }
}
