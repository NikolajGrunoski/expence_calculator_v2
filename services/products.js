const express = require('express');
const bodyParser = require('body-parser');
var jwt = require('express-jwt');
const config = require('../config/index.js');
const DBconn = require('../db/connection');
const products = require('../handlers/products');
const cors = require('cors');

DBconn.init(config.getConfig('db'));

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(
    jwt(
        {secret: config.getConfig('jwt').key}
    )
);

app.get('/app/v1/products/', products.getAll);
app.get('/app/v1/products/:id', products.getOne);
app.post('/app/v1/products/', products.save);
app.put('/app/v1/products/:id', products.replace);
app.patch('/app/v1/products/:id', products.update);
app.delete('/app/v1/products/:id', products.remove);

app.listen(8080, err =>{
    if(err){
        console.log('could not start server');
        console.log(err);
        return;
    }
    console.log('server started successfully on port 8080');
    
});
