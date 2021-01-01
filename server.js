const express = require('express');
const multerUploads = require('./middleware/multer');
const app = express();

app.get('/', (req, res) => {
  res.render('home.ejs');
});

app.post('/upload', multerUploads, (req, res) => {
  console.log('req.body :', req.body);
  console.log('req.file : ', req.file);
});

app.listen(3000);
