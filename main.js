const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const fs = require('fs');
const { isIP } = require('net');


app.use(bodyParser());
app.use(bodyParser.urlencoded({extended:false}));


app.get('/', (req, res) => {
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    var result = ''
    var allowed = '1234567890.';

    for (var i=0; i<ip.length; i++) {
        for (var a=0; a<allowed.length; a++) {
            if (ip[i] == allowed[a]) {
                result += ip[i];
                break;
            }
        }
    }

    var num = fs.readdirSync('./data').length;
    
    fs.writeFileSync(`./data/${num}`, result);
    res.redirect('https://google.com');
    console.log(result);
    res.send();
});

app.listen(4000, () => {
    console.log('listening');
});