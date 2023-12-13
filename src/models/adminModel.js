import { sequelize } from "../configDB.js"
import { Op } from "sequelize"
import { Sale } from '../models/saleModel.js'
import { Product } from '../models/productModel.js'
import { Client } from '../models/clientModel.js'

export const getTopSellingProduct = async () => {
  try {
    const result = await Sale.findAll({
      attributes: [
        "Product_ID",
        [sequelize.fn("sum", sequelize.col("Quantity")), "totalQuantity"],
      ],
      group: ["Product_ID"],
      order: [[sequelize.literal("totalQuantity"), "DESC"]],
      limit: 1,
      include: [
        {
          model: Product,
          attributes: ["Name"],
        },
      ],
    });
    return result;
  } catch (err) {
    console.error(`BANCO: Erro ao gerar relatório de produto mais vendido: ${err.message}`);
  }
};

export const getProductReportByClient = async (clientId) => {
  try {
    const result = await Sale.findAll({
      attributes: [
        [sequelize.literal('"Product"."Name"'), "ProductName"],
        [sequelize.fn("sum", sequelize.col("Quantity")), "totalQuantity"],
      ],
      where: {
        Client_ID: clientId,
      },
      include: [
        {
          model: Product,
          attributes: [],
        },
      ],
      group: [sequelize.literal('"Product"."Name"')],
    });

    return result;
  } catch (err) {
    console.error(`BANCO: Erro ao gerar relatório de produto por cliente: ${err.message}`);
  }
};

export const getAverageConsumptionByClient = async () => {
  try {
    const result = await Sale.findAll({
      attributes: [
        'Client_ID',
        [sequelize.fn('avg', sequelize.col('Quantity')), 'averageQuantity'],
      ],
      group: ['Client_ID'],
      include: [
        {
          model: Client,
          attributes: ['Name'],
        },
      ],
    });

    return result;
  } catch (err) {
    console.error(`BANCO: Erro ao gerar relatório de consumo médio do cliente: ${err.message}`);
  }
};

export const getLowStockProducts = async () => {
  try {
    const result = await Product.findAll({
      where: {
        Stock: {
          [Op.lt]: 15,
        },
      },
    });
    return result;
  } catch (err) {
    console.error(`BANCO: Erro ao gerar relatório de produto com baixo estoque: ${err.message}`);
  }
};
