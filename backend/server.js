require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const adminsRoutes = require('./routes/admins');
const cartsRoutes = require('./routes/carts');
const categoriesRoutes = require('./routes/categories');
const ordersRoutes = require('./routes/orders');
const paymentsRoutes = require('./routes/payments');
const productsRoutes = require('./routes/products');
const reviewsRoutes = require('./routes/reviews');
const usersRoutes = require('./routes/users');
const wishlistsRoutes = require('./routes/wishlists');

// express app
const app = express();

// middleware
app.cors();
app.use(express.json());


app.use((req, res, next) => { // prints all requests
  console.log(req.path, req.method); 
  next();
});

// routes
app.use('/api/admins',adminsRoutes);
app.use('/api/carts',cartsRoutes);
app.use('/api/categories',categoriesRoutes);
app.use('/api/orders',ordersRoutes);
app.use('/api/payments',paymentsRoutes);
app.use('/api/products',productsRoutes);
app.use('/api/reviews',reviewsRoutes);
app.use('/api/users',usersRoutes);
app.use('/api/wishlists',wishlistsRoutes);





// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => { // only start listening after connecting to db
        // listen for requests on a port
        app.listen(process.env.PORT, () => {
            console.log("Connected to db & listening on port", process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    })

