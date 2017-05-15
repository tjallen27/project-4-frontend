angular
  .module('Kuler', ['ui.router', 'ngResource', 'satellizer', 'checklist-model', 'ui.bootstrap', 'ngAnimate', 'ngMessages'])
  .constant('API_URL', 'https://protected-escarpment-25598.herokuapp.com/')
  .config(function() {
  Stripe.setPublishableKey('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
});
