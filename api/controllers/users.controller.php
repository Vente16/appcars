<?php 
   
   require_once "../models/users.class.php";

   $data = json_decode($_POST['data']);
   //print_r($data);
   $operation = new users();
   $method = $data->method;
   //echo $method;


   switch ($method) {

   	case 'login':
   		 $operation->login($data->email, $data->pass);
           /*    
              Este método recibe dos parametos correo y contraseña,
              en caso de exista el usuario retornará 1 de los contrario
              0
           */
   		break;

      case 'showId':
        $operation->showId($data->email);// $operation->login($data->email, $data->pass);
         break;   
   
       case 'registerUsers':
         $operation->registerUsers($data->name, $data->phone, $data->cel, $data->email, $data->password);
         break; 
    
       case 'showUser':
          $operation->showUser($data->id);
         break; 

       case 'updateUser':
         $operation->updateUsers($data->name, $data->phone, $data->cel, $data->email, $data->pass, $data->id);
         break;   

   	default:
   		echo "No has llamdo nungún método.";
   		break;
   } 
  
   




 ?>