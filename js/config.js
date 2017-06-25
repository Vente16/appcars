angular.module('appcars', ['ngRoute', 'LocalStorageModule'])
.config(function($routeProvider){

   $routeProvider
   .when('/',{
   
      templateUrl: 'views/index.html',
      controller: 'index'

   })
   .when('/login',{
   
      templateUrl: 'views/login.html',
      controller: 'login'

   })
   .when('/register',{
   
      templateUrl: 'views/register.html',
       controller: 'userRegister'
    

   })
   .when('/vehicles',{
   
      templateUrl: 'views/products.html',
      controller: 'products'

   })
   .when('/car',{
   

      templateUrl: 'views/car.html',
      controller: 'car'


   })
   .when('/indexusers', {

     templateUrl: 'views/dashboard.html',
     controller: 'dashboardCtrl'

   })
   .when('/infovehicle/:id', {
     
     templateUrl: 'views/info_vehicle.html',
     controller: 'information'  


   })
   .when('/succesbuy', {
     
     templateUrl: 'views/success_buy.html',
     controller: 'session'
    // controller: 'information'  

   })
   .when('/shopping', {
       
     templateUrl: 'views/shopping.html',
     controller: "shopping"

   })
    .when('/myvehicles', {
       
     templateUrl: 'views/myvehicles.html',
    controller: 'myvehicles'
    //
   })
    .when('/registevehicle', {
       
     templateUrl: 'views/register_vehicle.html',
     controller: 'myCtrl'
    //updateusers
   })
    .when('/updateuser', {
       
     templateUrl: 'views/updateusers.html',
     controller: 'updateusers'
    //updateusers
   })
    .when('/succesupdateuser', {
        
     templateUrl: 'views/success_updateusers.html',
      controller: 'session'
    //updateusers
   })
    .when('/vehiclesucces', {
        
     templateUrl: 'views/succes_vechicle.html',
      controller: 'session'
    //updateusers
   })
     .when('/updateVehicle/:id', {
        
     templateUrl: 'views/update_vehicles.html',
     controller: 'updateVehicles'
    //updateusers
   })
   .otherwise({
      
      redirectTo: '/'

   });
   

});