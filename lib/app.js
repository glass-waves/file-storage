const express = require('express');
const app = express();

// app.use(express.urlencoded());
app.use(express.static(`${__dirname}/../public`));
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/upload', require('./controllers/file-uploads'))

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));
module.exports = app;


app.use(express.urlencoded({ extended: false }));
