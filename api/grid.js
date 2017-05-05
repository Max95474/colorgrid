'use strict';

const fs = require('fs');
const path = require('path');

const GRID_PATH = path.join(__dirname, '..', 'data', 'grid.json');

function grid(app) {
  app.get('/grid', (req, res) => {
    fs.readFile(GRID_PATH, 'utf8',
      (err, data) => err ? res.status(500).json(err) : res.status(200).json(JSON.parse(data)));
  });

  app.post('/grid', (req, res) => {
    const gridData = req.body;
    fs.writeFile(GRID_PATH, JSON.stringify(gridData), (err, data) => {
      if(err) {
        console.log("Error: ", err);
        res.status(500).send('Cannot update grid data')
      } else {
        res.sendStatus(200);
      }
    })
  });
}

module.exports = grid;