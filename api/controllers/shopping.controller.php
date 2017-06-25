<?php 
 
    require_once "../models/shopping.class.php";

    $data = json_decode($_POST['data']);
    $method =  $data->method;
    $operation = new shopping();

     switch ($method) {

     	case 'registerShop':

     		 $operation->registerShop(
     		 $data->vehicle_id, 
     		 $data->quantity, 
     		 $data->totally, 
     		 $data->date, 
     		 $data->user_buy);
     		
     		break;

     	case 'showShopid':
              $operation->showShop($data->id);
     		
     		break;	
     	
     	default:
     		# code...
     		break;
     }



 ?>