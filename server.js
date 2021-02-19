const express = require('express');
const { multerUploads, dataUri } = require('./middleware/multer');
const { cloudinaryConfig, uploader } = require('./config/cloudinaryConfig');

const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('*', cloudinaryConfig);

app.get('/', (req, res) => {
  res.render('home.ejs');
});

app.post('/upload', multerUploads, (req, res) => {
  console.log('req.body :', req.body);
  console.log('req.file : ', req.file);

  if (req.file) {
    const file = dataUri(req).content;
    return uploader
      .upload(file)
      .then((result) => {
      console.log(result);
        const image = result.url;
        return res.status(200).json({
          messge: 'Your image has been uploded successfully to cloudinary',
          data: { image },
        });
      })
      .catch((err) =>
        res.status(400).json({
          messge: 'someting went wrong while processing your request',
          data: { err },
        })
      );
  }
});

app.listen(PORT);
