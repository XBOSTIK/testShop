const Shop = require('../models/Shop');
const Product = require('../models/Product');

exports.addProductToShop = async (req, res) => {
    try {
      const { shopId, productName, price,imageUrl } = req.body;
  
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return res.status(404).json({ error: 'Store not found' });
      }
  
      const newProduct = new Product({
        name: productName,
        price,
        imageUrl,
        shop: shopId
      });
  
      const savedProduct = await newProduct.save();
      shop.products.push(savedProduct._id);
      await shop.save();
  
      return res.status(200).json({ message: 'Product successfully added to the store', product: savedProduct, shop });
  
    } catch (error) {
      console.error('An error has occurred:', error);
      res.status(500).json({ error: 'An error occurred while adding a product to the store' });
    }
  };

