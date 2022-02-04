const express = require('express');
const mysql = require('mysql');
const app = express();

const PORT = process.env.PORT || 5000

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

const connection = mysql.createConnection({
  host: 'us-cdbr-east-05.cleardb.net',
  user: 'be3bb2a082f868',
  password: '59454d69',
  database: 'heroku_2106127c0647041'
});

app.get('/', (req, res) => {
  res.render('top.ejs');
});

app.get('/index', (req, res) => {
  connection.query(
    'SELECT * FROM items',
    (error, results) => {
      res.render('index.ejs', {items: results});
    }
  );
});

app.get('/new', (req, res) => {
  res.render('new.ejs');
});

app.post('/create', (req, res) => {
  connection.query(
    'INSERT INTO items (name) VALUES (?)',
    [req.body.itemName],
    (error, results) => {
      res.redirect('/index');
    }
  );
});

app.post('/delete/:id', (req, res) => {
  connection.query(
    'DELETE FROM items WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.redirect('/index');
    }
  );
});

app.get('/edit/:id', (req, res) => {
  connection.query(
    'SELECT * FROM items WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.render('edit.ejs', {item: results[0]});
    }
  );
});

app.post('/update/:id', (req, res) => {
  // 選択されたメモを更新する処理を書いてください
  connection.query ('UPDATE items SET name = ? WHERE id = ?', [req.body.itemName, req.params.id], (error, results) => {
    res.redirect('/index');
  });
  // 以下の一覧画面へリダイレクトする処理を削除してください
  
});

app.listen(PORT, () => console.log('Listening on ${ PORT }'));
