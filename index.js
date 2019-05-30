const express = require('express')
const massive = require('massive')
require('dotenv').config()

const app = express();
const products_controller = require('./product_modules')

const {SERVER_PORT} = process.env
const {CONNECTION_STRING} = process.env

massive(CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance)
})
.catch(err => console.log(err));

app.use(express.json());

app.get('/api/products', products_controller.getAll);
app.get('/api/products/:id', products_controller.getOne);
app.post('/api/products', products_controller.create);
app.put('/api/products/:id', products_controller.update);
app.delete('/api/products/:id', products_controller.delete)


app.listen(SERVER_PORT, () => {
    console.log(`Server listening on ${SERVER_PORT}`)
})