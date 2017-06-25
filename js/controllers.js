angular.module('appcars')
.controller('login', ['$scope','$http','$location','localStorageService', 
    function($scope, $http, $location, localStorageService){

    $scope.invalid = "false";

    $scope.user = {

    	email: undefined
    };

    $scope.login = function(){
  
    // $scope.invalid = "true";
      $scope.user.method = "login";

      $http({
     
        method: "POST",
        url: "api/controllers/users.controller.php",
        data: "data="+JSON.stringify($scope.user),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}

      })
       .then(function(res){

        $scope.val = res.data;
       
         if ( $scope.val == 1) {
             
             $location.path("/indexusers");
             localStorageService.set("user", $scope.user.email);

         }
        else{
           $scope.invalid = "true";
         }
        


      });

    }

    if(localStorageService.get("user") !== null ){

        $location.path("/indexusers");
    }


}])
.controller('userRegister', ['$scope', '$http','$location' ,'localStorageService', 
    function($scope, $http, $location ,localStorageService){
  
   $scope.na = "Teos";

  $scope.res  = "true";
 
   $scope.user = {};

   $scope.register = function(){

   // $scope.res  = "false";
     console.log($scope.user);
           $scope.user.method = "registerUsers";

       $http({
 
            method: "POST",
            url: "api/controllers/users.controller.php",
            data: "data="+JSON.stringify($scope.user),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}

       }).then(function(res){
            
            console.log(res.data);
            $scope.res  = "false";

       });

   }

  if(localStorageService.get("user") !== null ){

        $location.path("/indexusers");
    } 





}])
.controller('dashboardCtrl', ['$scope','$http','$location','localStorageService', 
    function($scope, $http, $location, localStorageService){
 
       $scope.car;

      if(localStorageService.get("user") == null){
         
         $location.path("/");

      }

     $scope.logout = function(){
       
           window.localStorage.clear();
          $location.path("/");

     };

     var email  = localStorageService.get("user");
     var method = {"method": "showId", "email": email};
     
     $http({
               method: "POST",
               url: "api/controllers/users.controller.php",
               data: "data="+JSON.stringify(method),
               headers: {'Content-Type': 'application/x-www-form-urlencoded'}


        }).then(function(id){
              
            localStorageService.set('ident', id.data);
             
        });  


}])
.controller('myCtrl', ['$scope', 'fileUpload','localStorageService', '$location', 
   function($scope,fileUpload, localStorageService, $location){
          
    $scope.vechicle = [];

    $scope.uploadFile = function(){

    
        var file = $scope.myFile;
        console.log('file is ' );
        console.dir(file);
        var uploadUrl = "api/controllers/vehiclesimages.controller.php";
        $scope.vehicle.method = "registerVehicle";
        $scope.vehicle.user = localStorageService.get("ident");
        var text = $scope.vehicle;
        console.log(text);
        fileUpload.uploadFileToUrl(file, uploadUrl, text);
        $location.path("/vehiclesucces"); 
   };

       if(localStorageService.get("user") == null){
         
         $location.path("/");

      }

     $scope.logout = function(){
       
           window.localStorage.clear();
          $location.path("/");

     };


   
}])
.controller('updateVehicles', [ '$scope','fileUpload','$routeParams', '$location','$http', 
  'localStorageService', function($scope, fileUpload, $routeParams, $location, $http, localStorageService){


   $scope.id = $routeParams.id;
          
   $scope.data = {"method": "showVehicle", "id": $scope.id};

     $http({
      
       method: "POST",
       url: "api/controllers/vehicles.controller.php",
       data: "info="+JSON.stringify($scope.data),
       headers: {'Content-Type': 'application/x-www-form-urlencoded'}
 

     })
     .then(function(res){
         
         $scope.info = res.data;
         console.log(res.data);
  
     });

    $scope.updateVehicle = function(){

        var file = $scope.archive;
        console.dir(file);
        $scope.vehicle = {};
        var uploadUrl = "api/controllers/vehiclesimages.controller.php";
        $scope.vehicle.method = "UpdateVehicle";
        $scope.vehicle.id = $scope.id;
        $scope.vehicle.name = document.getElementById("name").value;
        $scope.vehicle.price =  document.getElementById("price").value;
        $scope.vehicle.description = document.getElementById("description").value;
        $scope.vehicle.photo =  $scope.info[0].photo;
        var text = $scope.vehicle;
        console.log($scope.vehicle);
        //fileUpload.uploadFileToUrl(file, uploadUrl, $scope.vehicle);
       // $location.path("/vehiclesucces"); 
  


    }

        if(localStorageService.get("user") == null){
         
         $location.path("/");

      }

     $scope.logout = function(){
       
           window.localStorage.clear();
          $location.path("/");

     };


}])
.directive('fileModel', ['$parse', function ($parse) {
    return {
    restrict: 'A',
    link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function(){
            scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
            });
        });
    }
   };
}])
.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl, vehicle){
         var fd = new FormData();
         fd.append('file', file);
         fd.append('name', vehicle.name);
         fd.append('description', vehicle.description);
         fd.append('price', vehicle.price);
         fd.append('method', vehicle.method);
         fd.append('user', vehicle.user);
         fd.append('vehicle', vehicle.id);
         fd.append('photo', vehicle.photo);
         $http.post(uploadUrl, fd, {
             transformRequest: angular.identity,
             headers: {'Content-Type': undefined,'Process-Data': false}
         })
         .then(function(res){
            //console.log(res.data);
         });
         
     }
 }])
.controller('products', ['$scope', '$location', '$http' ,'localStorageService', 'date', 
    function($scope, $location, $http ,localStorageService, date){
     
         if(localStorageService.get("user") == null){
         
         $location.path("/");

      }

     $scope.logout = function(){
       
           window.localStorage.clear();
          $location.path("/");

     };

       $scope.productos = [];
      
       $scope.usertest = localStorageService.get("user");
       $scope.method = {"method": "showAll"};
         
       $http({
             
             method: "POST",
             url: "api/controllers/vehicles.controller.php",
             data: "info="+JSON.stringify($scope.method),
             headers: {'Content-Type': 'application/x-www-form-urlencoded'}

       })
        .then(function(response){
            $scope.productos = response.data;
          //  console.log($scope.productos);

        });
       
       
       console.log(localStorageService.get("ident"));

      /* $scope.date = date.getDate();

       console.log($scope.date); */
        
    


    

}])
.controller('car', ['$scope', '$location', 'localStorageService', '$http', 'date', 
    function($scope, $location, localStorageService, $http, date){
 
     

      if(localStorageService.get("user") == null){
         
         $location.path("/");

      }

     $scope.logout = function(){

       window.localStorage.clear();

       $location.path("/");

     };

     $scope.save = function(info){
       
        $scope.information = info;
       // localStorageService.remove("car");
       // $location.path("/succesbuy");
        $scope.information.method = "registerShop";
        $scope.information.date = date.getDate();
          
           // console.log($scope.information);
         $http({
             
              method: "POST",
              url: "api/controllers/shopping.controller.php",
              data: "data="+JSON.stringify($scope.information),
              headers: {"Content-Type": "application/x-www-form-urlencoded"}


         }).then(function(test){

            localStorageService.remove("car");
            $location.path("/succesbuy");

         });  

     }


   $scope.cancel = function(){
      
      localStorageService.remove("car");
      $location.path("/vehicles");
     
    } 

     $scope.carAll = localStorageService.get("car");
    // console.log($scope.carAll);
   // console.log($scope.show.vehicle_name);

    /*for (var i = 0;i<=$scope.show.length; i++) {
        
       $scope.totally=+ $scope.show.total[i];
    }*/
  //  console.log($scope.show.[0]);
    
    //$scope.show.push(localStorageService.set("shop",$scope.show));

}]).controller('index', ['$scope', '$location', 'localStorageService',
     function($scope, $location, localStorageService){

    if(localStorageService.get("user") == null){
         
         $location.path("/");

      }

     $scope.logout = function(){
       
           window.localStorage.clear();
          $location.path("/");

     };

     if(localStorageService.get("user") !== null ){

        $location.path("/indexusers");
    } 




  // console.log(localStorageService.length());
   
   

}])
.controller('session', ['$scope', '$location', 'localStorageService' 
 ,function($scope, $location, localStorageService){

 if(localStorageService.get("user") == null){
         
         $location.path("/");

      }

     $scope.logout = function(){
       
           window.localStorage.clear();
          $location.path("/");

     };

     if(localStorageService.get("user") !== null ){

        $location.path("/indexusers");
    } 








}])
.controller('information',['$scope', '$routeParams', '$http', '$location', 'localStorageService', 
  function($scope, $routeParams, $http, $location, localStorageService){
        
        $scope.id = $routeParams.id;
        $scope.data = {"method": "showVehicle", "id":$scope.id};
        $scope.info;
        $scope.cant = 0;

       $http({

            method: "POST",
            url: "api/controllers/vehicles.controller.php",
            data: "info="+JSON.stringify($scope.data),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}

       }).then(function(response){

           $scope.info = response.data;
          // console.log($scope.info);

       });   
  

      $scope.notbuy = "false";

      $scope.buy = function(shop){
          
         if($scope.cant == 0 || $scope.cant < 0){
           
            $scope.notbuy = "true";
         }
         else {
          
          shop.quantity = $scope.cant;
          shop.user_buy = localStorageService.get("ident");
          shop.totally  = shop.quantity * shop.price;
          localStorageService.set("car", shop);
          $location.path("/car");

          // ident 
           /*
              ident es id del usuario logueado que hará la compra
          */
         }
          
        
         

      }

    $scope.less = function(){

         $scope.cant =  $scope.cant-1;
        
    }

     $scope.more = function(){
   
          $scope.cant =  $scope.cant+1;
    }

        if(localStorageService.get("user") == null){
         
         $location.path("/");

      }

     $scope.logout = function(){
       
           window.localStorage.clear();
          $location.path("/");

     };

     


}]).controller("updateusers", ['$scope','$http', 'localStorageService','$location', function($scope, $http, localStorageService, $location){
       
      

       $scope.id = localStorageService.get("ident");
       $scope.res  = "true";
       $scope.con = {"method": "showUser", "id":$scope.id}; 
       $scope.info;
     
       
        $http({
             
              method: 'POST',
              url: 'api/controllers/users.controller.php',
              data: 'data='+JSON.stringify($scope.con),
              headers: {'Content-Type': 'application/x-www-form-urlencoded'}   
 

        }).then(function(response){
          
            $scope.info = response.data;
           // console.log($scope.info);
            
        });

  
    $scope.updateUser = function(){
        
     $scope.datos = {};
    
     $scope.datos.name  =   document.getElementById("name").value;
     $scope.datos.phone =   document.getElementById("phone").value; 
     $scope.datos.cel   =   document.getElementById("cel").value;
     $scope.datos.email =   document.getElementById("email").value; 
     $scope.datos.pass  =    document.getElementById("pass").value;   
     $scope.datos.id =  $scope.id;
     $scope.datos.method = "updateUser";
     console.log($scope.datos);

       $http({
             
              method: 'POST',
              url: 'api/controllers/users.controller.php',
              data: 'data='+JSON.stringify($scope.datos),
              headers: {'Content-Type': 'application/x-www-form-urlencoded'}   
 

        }).then(function(call){
          
           // console.log(call.data);
            $location.path("/succesupdateuser");
            
        }); 
        
    }

        if(localStorageService.get("user") == null){
         
         $location.path("/");

      }

     $scope.logout = function(){
       
           window.localStorage.clear();
          $location.path("/");

     };




}])
.controller("shopping", ['$scope', '$http', 'localStorageService', '$location',
  function($scope, $http, localStorageService, $location){

      
   $scope.id = localStorageService.get("ident");
   $scope.show = {"method": "showShopid", "id": $scope.id};

         
         $http({
             
              method: "POST",
              url: "api/controllers/shopping.controller.php",
              data: "data="+JSON.stringify($scope.show),
              headers: {"Content-Type": "application/x-www-form-urlencoded"}


         }).then(function(test){
           
            $scope.tam = test.data.length;
            $scope.shopp = test.data;
           // console.log($scope.shopp);

         });  

             if(localStorageService.get("user") == null){
         
         $location.path("/");

      }

     $scope.logout = function(){
       
           window.localStorage.clear();
          $location.path("/");

     };






}]).controller('myvehicles', ['$scope', '$http', '$location',  'localStorageService', 
  function($scope, $http, $location,  localStorageService){


   $scope.test = localStorageService.get("ident");
   $scope.user = {"method": "showVehicleUser", "id":  $scope.test};  
     
      $scope.show  = function(){

        $http({
          
             method: "POST",
             url: "api/controllers/vehicles.controller.php",
             data: "info="+JSON.stringify($scope.user),
             headers: {'Content-Type': 'application/x-www-form-urlencoded'}



        }).then(function(respo){
            
            $scope.tam = respo.data.length;
            $scope.myvehicles = respo.data;
           // console.log( $scope.myvehicles);
          
        });

    }

    $scope.show();

   $scope.registerve = function(){
 
     $location.path("/registevehicle");

  }

  $scope.delete = function(id){

      $scope.data = {"method": "deleteVehicle", "id":id};
        var validate =  confirm("¿Está seguro(a) de eliminar este vehículo?"); 

         if(validate){

           $http({
               
                 method: "POST",
                 url: "api/controllers/vehicles.controller.php",
                 data: "info="+JSON.stringify($scope.data),
                 headers: {'Content-Type': 'application/x-www-form-urlencoded'}


           }).then(function(msj){

              $scope.show();
                

           });
        
        }

  }

  $scope.updatevehicle = function(id){


      $location.path("/updateVehicle/"+id);
  }

      if(localStorageService.get("user") == null){
         
         $location.path("/");

      }

     $scope.logout = function(){
       
           window.localStorage.clear();
          $location.path("/");

     };





}])
.service('date', function(){

   this.getDate = function(){
 
        var date = new Date();
        var weekday  = date.getDay();
        var day = date.getDate();
        var month = date.getMonth();

        switch(weekday ){
              case 1:
              weekday  = "Lunes";
                break;

               case 2:
              weekday  = "Martes";

              break;

               case 3:
              weekday  = "Miercoles";
              break;

               case 4:
              weekday  = "Jueves";
              break;

               case 5:
              weekday  = "Viernes";
              break;

               case 6:
              weekday  = "Sabado";
              break;

               case 7:
              day = "Domingo";
              break;
        }

        switch(month){
              case 0:
            month  = "Enero";
              break;
               case 1:
            month  = "Febrero";
              break;
               case 2:
            month  = "Marzo";
              break;
               case 3:
            month  = "Abril";
              break;
               case 4:
            month  = "Mayo";
              break;
               case 5:
            month  = "Junio";
              break;
               case 6:
            month = "Julio";
              break;
                case 7:
            month  = "Agosto";
              break;
               case 8:
            month  = "Septiembre";
              break;
               case 9:
            month  = "Octubre";
              break;
               case 10:
            month  = "Noviembre";
              break;
               case 11:
            month  = "Diciembre";
             
        }

 
        var year = date.getFullYear(); 

        return  weekday+ " "+day+ " de "+month+ " del "+year;  

     }
        

});
