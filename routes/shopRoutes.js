const express = require('express');
const router = express.Router();
const {createShop, getAllShops, getShopProduct, createOrder} = require('../controllers/shopController');

router.post('/', createShop);
router.get('/', getAllShops);
router.get('/:id/products', getShopProduct);
module.exports = router;