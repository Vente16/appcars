<?php 
   
   require_once "connection.class.php";

    class vehicles{

      public $con;

      public function __construct(){
     
       $connection = new connection();
       $this->con = $connection->getConnection();

       }

       public function showAll(){
    
       $query = $this->con->prepare("SELECT * FROM vehicles 
       INNER JOIN users
       ON users.user_id = vehicles.user_id 
       WHERE vehicles.state=1
       ORDER BY vehicles.vehicle_id DESC
       ");
       $query->execute();
       $json = array(); 

	      foreach ($query as $vehicle) {
	        
	      // echo  "<h1>". $vehicle['user_name']. "</h1>";  
	      $json[]= $vehicle;

          }
           
        echo json_encode($json);     


       }

      public function showVehicle($id){
    
       $query = $this->con->prepare("SELECT * FROM vehicles 
       INNER JOIN users
       ON users.user_id = vehicles.user_id 
       WHERE vehicles.vehicle_id=:id");
       $query->bindParam("id", $id);
       $query->execute();
       $json = array(); 

        foreach ($query as $vehicle) {
          
        // echo  "<h1>". $vehicle['user_name']. "</h1>";  
        $json[]= $vehicle;

          }
           
        echo json_encode($json);     


       }

       public function showVehicleUser($id){
    
       $query = $this->con->prepare("SELECT * FROM vehicles 
       WHERE user_id=:id AND state=1");
       $query->bindParam(":id", $id);
       $query->execute();
       $json = array(); 

        foreach ($query as $vehicle) {
          
        // echo  "<h1>". $vehicle['user_name']. "</h1>";  
        $json[]= $vehicle;

          }
           
        echo json_encode($json);     


       }


       public function registerVehicle($vehicle_name, $price, $description, $photo, $user_id){
       
       $sql = "INSERT INTO vehicles (vehicle_name, price, description,
              photo, state, user_id, sales) VALUES (:vehicle_name,
              :price, :description, :photo, 1, :user_id, 0)
              ";
       
       $query = $this->con->prepare($sql);
       $query->bindParam(":vehicle_name", $vehicle_name);
       $query->bindParam(":price", $price);
       $query->bindParam(":description", $description);
       $query->bindParam(":photo", $photo);
       $query->bindParam(":user_id", $user_id);
       $query->execute();

      
       }

       public function deleteVehicle($vehicle_id){
 
       $sql = "UPDATE vehicles SET state=0 WHERE vehicle_id=:vehicle_id";
       $query = $this->con->prepare($sql);
       $query->bindParam(":vehicle_id", $vehicle_id);
       $query->execute();


       }

       public function updateVehicle($vehicle_name, $price, $description, $photo,$vehicle_id){
       
       $sql = "UPDATE vehicles SET vehicle_name=:vehicle_name, 
       price=:price, description=:description,
       photo=:photo WHERE vehicle_id = :vehicle_id;";
       
       $query = $this->con->prepare($sql);
       $query->bindParam(":vehicle_name", $vehicle_name);
       $query->bindParam(":price", $price);
       $query->bindParam(":description", $description);
       $query->bindParam(":photo", $photo);
       $query->bindParam(":vehicle_id", $vehicle_id);
       $query->execute();

      
       }


     }

    // $ob = new vehicles();
    
  
    

 ?>