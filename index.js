const express = require('express');
const mongoose = require('mongoose');
const shopRoutes = require('./routes/shopRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const PORT = process.env.PORT || 5000;
const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use('/api/shops', shopRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://veroniksa:veroniksa2001@cluster0.yrqyz92.mongodb.net/')
        app.listen(PORT, ()=> {
            console.log(`Server started on port ${PORT}`);
        })
    } catch (err) {
        console.log(err);   
    }
}
start();    
module.exports = { start };