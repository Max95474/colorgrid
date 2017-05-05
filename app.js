'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const PORT = 3000;
const DATA_PATH = path.join(__dirname, 'data');
const GRID_PATH = path.join(DATA_PATH, 'grid.json');

if (!fs.existsSync(DATA_PATH)) {
  fs.mkdirSync(DATA_PATH);
}
if (!fs.existsSync(GRID_PATH)) {
  fs.writeFileSync(GRID_PATH, JSON.stringify({}));
}

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));

require('./api/grid')(app);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));