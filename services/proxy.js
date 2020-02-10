const express = require('express');
const proxy = require('http-proxy');

var app = express();
var apiProxy = proxy.createProxyServer();

app.all('/app/v1/products/*', (req, res) =>{
    apiProxy.web(req, res, {target: 'http://localhost:8080'});

});


app.all('/app/v1/auth/*', (req, res) =>{
    apiProxy.web(req, res, {target: 'http://localhost:8081'});

});


app.all('/*', (req,res)=>{
    // res.status(404).send('Not Found!')
    apiProxy.web(req, res, {target: 'http://localhost:8082'});
});

app.listen(process.env.PORT, err =>{
    if(err){
        console.log('could not start server');
        console.log(err);
        return;
    }
    console.log('server started successfully on port');
});