<?php 	
      require_once "../models/vehicles.class.php";

    $data = json_decode($_POST['info']);

    $method = $data->method;
    $b = new vehicles();
    //print_r($data);
    //echo $method;
     switch ($method) {

     	case 'showAll':
     		$b->showAll();
     		break;
     	
        case 'showVehicle':
            $b->showVehicle($data->id);
            break;

        case 'showVehicleUser':
            $b->showVehicleUser($data->id);
            break;

        case 'deleteVehicle':
            $b->deleteVehicle($data->id);
            break;          


     	default:
     		# code...
     		break;
     } 
    





 ?>
