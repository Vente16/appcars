<?php 
      
     require_once "../models/vehicles.class.php";

       $ob = new vehicles();
   

       $method = $_POST['method'];

       switch ($method) {
            case 'registerVehicle':
                  $target_dir = "../../upload/";
                  $target_file = $target_dir . basename($_FILES["file"]["name"]);
                  print_r($_FILES);
                  move_uploaded_file($_FILES["file"]["tmp_name"], $target_file);
                  $vehicle_name = $_POST['name'];
                  $price = $_POST['price'];
                  $description = $_POST['description'];
                  $photo = "upload/".basename($_FILES["file"]["name"]);
                  $user_id =  $_POST['user'];
                  $ob->registerVehicle($vehicle_name,  $price, $description, $photo, $user_id);
                 break;


            case 'UpdateVehicle':
                   echo "Método para actualizar";
                   $target_dir = "../../upload/";
                   $ar = basename($_FILES["file"]["name"]);
                   print_r($_FILES);
                   break;     
            
            default:
                 # code...
                 break;
       }


    /* $target_dir = "../../upload/";
     $name = $_POST['name'];
     print_r($_FILES);
     $target_file = $target_dir . basename($_FILES["file"]["name"]);
     $url = basename($_FILES["file"]["name"]);
     $description = $_POST['description'];
     $price = $_POST['price'];
  
     echo $method;
     echo "Descripcion: ".$description."  ---- ";
     echo "Precio: ".$price. " ---- ";
     echo  $url;

     if(){
          echo "Sí: ".$target_file;

     }else{
          echo "No";
     }
       */












 ?>