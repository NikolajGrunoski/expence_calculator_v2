const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(8082, err => {
    if(err){
        console.log('could not start server');
        console.log(err);
        return;
    }
    console.log('server started successfully on port 8082');
});