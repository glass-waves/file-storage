const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1/upload', require('./controllers/file-uploads'))

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));
module.exports = app;
