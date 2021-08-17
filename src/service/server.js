const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var fs = require('fs');
const { json } = require('body-parser');
const _dirname = '/Users/jueunchang/project/moviemory/moviemory/src/html'
let _url = null;

const app = express()
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    if (req.cookies.id === '' || req.cookies.id === undefined)
        _url = '/main.html';
    else
        _url = '/index.html';
    
    res.sendFile(_dirname + _url);
})
app.get('/search', (req, res) => {
    _url = '/index.html';
    res.sendFile(_dirname + _url);
})
app.get('/video', (req, res) => {
    _url = '/video.html';
    res.sendFile(_dirname + _url);
})
app.get('/myPage', (req,res) => {
    _url = '/index.html';
    res.sendFile(_dirname + _url);
})
app.get('/addMovie', (req,res) => {
    _url = '/addMovie.html';
    res.sendFile(_dirname + _url);
})
app.get('/image__editor', (req,res) => {
    _url = '/editor.html';
    res.sendFile(_dirname + _url);
})

app.get('/userMovies', (req,res) => {
    let data = fs.readFileSync('./userInfo/movieList.json');
    data = JSON.parse(data);
    res.send(data);
})
app.post('/addMovie__process', (req, res) => {
    //여기에서 데이터 처리
    const title = req.body.title;
    const title_long = req.body.title;
    const rating = req.body.rating;
    const year = req.body.year;
    const genres = [req.body.genres];
    const summary = req.body.description;
    const large_cover_image = req.body.image;
    const medium_cover_image = req.body.image;
    const yt_trailer_code = req.body.video;
    const movieList = { title, title_long, year, rating, genres, summary, medium_cover_image,large_cover_image, yt_trailer_code  }
    
    let data = fs.readFileSync('./userInfo/movieList.json');
    data = JSON.parse(data);
    const id = req.cookies.id;
    let check = false;
    data.data.forEach((element, index) => {
        console.log(index);
        if (data.data[index] && data.data[index][id]) {
            console.log(data.data[index][id]);
            data.data[index][id].push(movieList);
            check = true;
        }
    })
    if (!check) {
        const index = data.data.length;
        let newData = {};
        newData[id] = [movieList];
        data.data[index] = newData;
    }

    fs.writeFileSync('./userInfo/movieList.json', JSON.stringify(data));
    res.redirect('/myPage');
})
app.get('/process__signIn', (req, res) => {
    if (req.query.id) {
        _url = '/check.html';
        res.sendFile(_dirname + _url);
    } else {
        res.redirect('/');
    }
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
    if (_url === null) {
        res.redirect('/process__signIn/?id=wrong');
    }
    else
        res.sendFile(_dirname + _url);
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
    res.sendFile(_dirname + _url);
})


app.listen(3000, () => console.log('Example app listening on port 3000!'))