const Order = require('../models/Order');

const createOrder = async (req, res) => {
    try {
      const { products, customerName, customerEmail, customerPhone, customerAddress, shop, totalAmount } = req.body;
  
      const order = new Order({
        products,
        shop,
        customerName,
        customerEmail,
        customerPhone,
        customerAddress,
        totalAmount,
      });
  
      await order.save();
  
      return res.status(201).json({ message: 'The order was created successfully' });
    } catch (error) {
      console.error('An error occurred when creating the order', error);
      res.status(500).json({ error: 'Server error' });
    }
  }

module.exports = {
createOrder
}