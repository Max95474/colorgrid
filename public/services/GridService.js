angular.module('app').factory('GridService', function ($http) {

  function getGrid() {
    return $http.get('/grid').then(response => response.data)
  }

  function saveGrid(gridData) {
    return $http.post('/grid', gridData)
  }

  return {
    getGrid: getGrid,
    saveGrid: saveGrid
  }
});