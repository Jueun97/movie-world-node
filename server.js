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
        _url = "/index.html";
    else 
        _url = '/main.html';
    
    res.sendFile(__dirname + _url);
})

app.post('/process__signIn', (req, res) => {
    console.log("sign in => ", req.body);

    //로그인 체크 
    //로그인 완료 시 쿠키로 저장 
    res.cookie('id', req.body.id);

    //로그인 실패 시 다시 진행하도록
    res.redirect('/');
})

app.post('/process__signUp', (req, res) => {
    console.log("sign up => ", req.body);
    let data = fs.readFileSync('./userInfo/users.json');
    let users = JSON.parse(data);
    let newUser = { 'name': req.body.name, 'phone': req.body.phone, 'id': req.body.id, 'password': req.body.password };
    users.items.push(newUser)
    fs.writeFileSync('./userInfo/users.json', JSON.stringify(users));
    _url = '/check.html';
    res.sendFile(__dirname + _url);
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))