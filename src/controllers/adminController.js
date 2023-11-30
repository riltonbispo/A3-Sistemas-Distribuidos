import * as model from '../models/adminModel.js'


export const getMostSoldProducts = async (req,res) => {
  try {
    const result = await model.getMostSoldProducts()
    result ? res.json(result) : res.status(404)
  } catch (error) {
    console.log(`API: Erro ao buscar produtos mais vendidos`)
    res.sendStatus(500)
  }
}

export const getProductsByClient = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await model.getProductsByClient(id);
    res.json(result);
    res.status(404);
  } catch (error) {
    console.log(`API: Erro ao buscar produtos por cliente`);
    res.sendStatus(500);
  }
};
export const getConsumptionByClient = async (req,res) => {
  try {
    const result = await model.getConsumptionByClient()
    result ? res.json(result) : res.status(404)
  } catch (error) {
    console.log(`API: Erro ao buscar consumo medio`)
    res.sendStatus(500)
  }
}

export const getLowStockProducts = async (req,res) => {
  try {
    const result = await model.getLowStockProducts()
    result ? res.json(result) : res.status(404)
  } catch (error) {
    console.log(`API: Erro ao buscar produtos com baixo estoque`)
    res.sendStatus(500)
  }
}
