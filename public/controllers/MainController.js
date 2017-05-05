angular.module('app').controller('MainController', function(GridService) {
  var vm = this;

  var COL_COUNT = 10;
  var ROW_COUNT = 10;

  function init() {
    vm.colors = [
      {title: 'Red',   hexString: '#FF0000'},
      {title: 'Green', hexString: '#00FF00'},
      {title: 'Blue',  hexString: '#0000FF'},
      {title: 'Black', hexString: '#000000'}
    ];
    initGrid();
  }
  vm.onDropComplete = function($data, item) {
    if(item.hexString === '#FFFFFF') {
      item.hexString = $data.hexString;
    } else {
      item.hexString = mix(item.hexString, $data.hexString);
    }
  };

  vm.loadGrid = function() {
    GridService.getGrid()
      .then(function(grid) {
        if(Object.keys(grid).length) {
          vm.grid = grid
        } else {
          initGrid();
        }
      })
      .catch(function (err) { console.log("Error: cannot load grid: ", err) })
  };

  vm.saveGrid = function () {
    GridService.saveGrid(vm.grid)
      .then(function(result) { console.log("Grid saved: ", result) })
      .catch(function(err) { console.log("Cannot save grid: ", err) })
  };

  vm.resetGrid = function() {
    initGrid();
  };

  function initGrid() {
    vm.grid = [];
    for(var i = 0; i < ROW_COUNT; i++) {
      vm.grid.push([]);
      for(var j = 0; j < COL_COUNT; j++) {
        vm.grid[i].push({
          hexString: '#FFFFFF'
        })
      }
    }
  }

  var mix = function(color_1, color_2, weight) {
    function d2h(d) { return d.toString(16); }  // convert a decimal value to hex
    function h2d(h) { return parseInt(h, 16); } // convert a hex value to decimal

    weight = (typeof(weight) !== 'undefined') ? weight : 50; // set the weight to 50%, if that argument is omitted

    var color = "#";

    if(color_1.indexOf('#') !== -1) color_1 = color_1.replace('#', '');
    if(color_2.indexOf('#') !== -1) color_2 = color_2.replace('#', '');

    for(var i = 0; i <= 5; i += 2) { // loop through each of the 3 hex pairs—red, green, and blue
      var v1 = h2d(color_1.substr(i, 2)), // extract the current pairs
        v2 = h2d(color_2.substr(i, 2)),

        // combine the current pairs from each source color, according to the specified weight
        val = d2h(Math.floor(v2 + (v1 - v2) * (weight / 100.0)));

      while(val.length < 2) { val = '0' + val; } // prepend a '0' if val results in a single digit

      color += val; // concatenate val to our new color string
    }

    return color; // PROFIT!
  };

  init();
});