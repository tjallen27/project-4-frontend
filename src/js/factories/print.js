angular
  .module('Kuler')
  .factory('Print', Print);

Print.$inject = ['$resource', 'API_URL'];
function Print($resource, API_URL) {
  return new $resource(`${API_URL}/prints/`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
