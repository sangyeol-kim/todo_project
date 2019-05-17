const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const history = require('connect-history-api-fallback');
require('dotenv').config();

var connect = require('./model');

const indexRouter = require('./routes/index');
const todoRouter = require('./routes/todo');

const app = express();

connect(); // DB 실행

app.set('port', process.env.PORT || 8001);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/todos', todoRouter);
app.use(history());

app.get('/', (req, res, next) =>{
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(app.get('port'), () => {
  console.log(`서버가 ${app.get('port')}번 포트에서 정상적으로 작동합니다.`);
});
