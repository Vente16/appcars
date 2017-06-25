<?php 
 
    require_once "connection.class.php";

   class shopping {
   

    public $con;

    public function __construct(){
     
     $connection = new connection();
     $this->con = $connection->getConnection();

    }

   
   public function registerShop($id_vehicle, $quantity, $total, $date_buy, $id_buyer){
      
    $sql = "INSERT INTO shopping (
    id_vehicle, quantity, total, date_buy, id_buyer) 
    VALUES (:id_vehicle, :quantity, :total, :date_buy, :id_buyer)"; 
    $query = $this->con->prepare($sql);
    $query->bindParam(":id_vehicle",$id_vehicle);
    $query->bindParam(":quantity",$quantity); 
    $query->bindParam(":total",$total);  
    $query->bindParam(":date_buy",$date_buy);  
    $query->bindParam(":id_buyer",$id_buyer);
    $query->execute();

    $sql2 = "UPDATE vehicles SET sales = sales+1 WHERE vehicle_id=:id_vehicle";
    $query2 =  $this->con->prepare($sql2);
    $query2->bindParam(":id_vehicle", $id_vehicle);
    $query2->execute(); 

    
   }

   public function showShop($id_buyer){
    
     $sql = "SELECT * FROM shopping
     INNER JOIN vehicles ON shopping.id_vehicle = vehicles.vehicle_id
     INNER JOIN users ON vehicles.user_id = users.user_id
     WHERE shopping.id_buyer = :id_buyer";

    $query = $this->con->prepare($sql);
    $query->bindParam(":id_buyer", $id_buyer); 
    $query->execute();
    $json = array();

    foreach ($query as $info) {

    	$json[] = $info; 
    }

    echo json_encode($json);


   }

 /* $ob = new shopping();
  $ob->showShop(1); */
  }

 ?>