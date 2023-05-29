const Shop = require('../models/Shop');

const createShop = (req, res) => {
  const { name, isActive } = req.body;

  const newShop = new Shop({
    name,
    products: [],
    isActive
  });

  newShop.save()
    .then((savedShop) => {
        res.status(201).json(savedShop);
    })
    .catch((error) => {
        res.status(500).json({ error: 'An error occurred while saving the store' });
    });
};

const getAllShops = async (req, res) => {
  try {
    const shops = await Shop.find();
    res.status(200).json({ shops });
  } catch (err) {
    console.error('An error occurred:', err);
  }
};

const getShopProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const shop = await Shop.findById(id).populate('products');
    if (!shop) {
      return res.status(404).json({ error: 'Store not found' });
    }

    const products = shop.products;

    res.status(200).json({ products });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while fetching store products' });
  }
};


module.exports = {
  createShop,
  getAllShops,
  getShopProduct,
}