const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var fs = require('fs');
const { json } = require('body-parser');
let _url = null;

const app = express()
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    if (req.cookies.id)
        _url = '/index.html';
    else 
        _url = '/main.html';
    
    res.sendFile(__dirname + _url);
})
app.get('/search', (req, res) => {
    _url = '/index.html';
    res.sendFile(__dirname + _url);
})
app.get('/video', (req, res) => {
    _url = '/video.html';
    res.sendFile(__dirname + _url);
})
app.get('/myPage', (req,res) => {
    _url = '/myPage.html';
    res.sendFile(__dirname + _url);
})
app.get('/addMovie', (req,res) => {
    _url = '/addMovie.html';
    res.sendFile(__dirname + _url);
})
app.get('/image__editor', (req,res) => {
    _url = '/editor.html';
    res.sendFile(__dirname + _url);
})
app.post('/addMovie__process', (req, res) => {
    //여기에서 데이터 처리
    const title = req.body.title;
    const genres = req.body.genres;
    const summary = req.body.summary;
    const image = req.body.image;
    const movieList = { title, genres, summary, image }
    fs.writeFileSync('./userInfo/movieList.json', JSON.stringify(movieList));
    res.redirect('/myPage');
})

app.post('/process__signIn', (req, res) => {
    const id = req.body.id;
    const password = req.body.password;

    const data = fs.readFileSync('./userInfo/users.json');
    let users = JSON.parse(data);
    _url = null;
    users.items.forEach(user => {
        if (user.id === id && user.password === password) {
            res.cookie('id', req.body.id);
            _url = '/check.html';
        }
    })
    if (_url === null)
        res.redirect('/');
    else
        res.sendFile(__dirname + _url);
    //로그인 실패 시 다시 진행하도록
    
})

app.post('/process__signUp', (req, res) => {
    const name = req.body.name;
    const phone = req.body.phone;
    const id = req.body.id;
    const password = req.body.password;

    const data = fs.readFileSync('./userInfo/users.json');
    let users = JSON.parse(data);
    const newUser = { name, phone, id, password };
    users.items.push(newUser)
    fs.writeFileSync('./userInfo/users.json', JSON.stringify(users));
    _url = '/check.html';
    res.sendFile(__dirname + _url);
})


app.listen(3000, () => console.log('Example app listening on port 3000!'))