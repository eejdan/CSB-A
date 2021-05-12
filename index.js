console.log("Concurs Severin Bumbaru - Echipa Agape si Metanoia 2021C")
require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

{
    let proxyIp;
    if(process.env.LOCAL==1) proxyIp = 'localhost:' + process.env.LOCALAPIPORT;
    else proxyIp = process.env.REMOTEAPIADDR + ':' + process.env.REMOTEAPIPORT;
    app.use('/api', proxy(proxyIp));
}

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))
app.use(cookieParser(process.env.COOKIEPASS))

app.use()

app.get('/', (req, res) => {
    return res.render('index');
});

app.get('/login', (req, res) => {
    return res.render('login');
});

app.get('/transurb', (req, res) => {

})



app.listen(3030, () => { console.log("Listening");})