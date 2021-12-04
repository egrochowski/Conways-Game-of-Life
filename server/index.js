const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`listening at port ${PORT}...`);
});