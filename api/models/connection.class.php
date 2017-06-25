<?php 

   class connection{

    
    public function getConnection(){

     $connection = new PDO("mysql:host=localhost; dbname=appcars;charset=utf8", "root", "");
     return $connection;

    }
 

   } 



 ?>