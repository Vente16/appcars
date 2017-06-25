<?php 
 
  require_once "connection.class.php";

   class users{
  
    public $con;

    public function __construct(){
     
     $connection = new connection();
     $this->con = $connection->getConnection();

    }


    public function login($email, $password){
  
      $sql = "SELECT *FROM users WHERE email=:email AND password=:password";
      $query = $this->con->prepare($sql);
      $query->bindParam(":email", $email);
      $query->bindParam(":password", $password);
      $query->execute();     
      
       $count = 0;

  	   foreach ($query as $k) {

      		 if(strlen($k['email']) > 0) {
      		 	$count++;
            
      		 }
  			
  		 }

       echo $count;

    }

    public function showId($email){
    
    $sql   = "SELECT user_id FROM users WHERE email=:email";
    $query = $this->con->prepare($sql);
    $query->bindParam(":email", $email);
    $query->execute();

     foreach ($query as $id) {
        
        echo $id['user_id'];
      } 

    }


    public function registerUsers($user_name, $phone, $cel, $email, $password){

      $sql = "INSERT INTO users (user_name, phone, cel,email, password)
       VALUES (:user_name, :phone, :cel, :email, :password)";

      $query = $this->con->prepare($sql);
      $query->bindParam(":user_name", $user_name);
      $query->bindParam(":phone", $phone);
      $query->bindParam(":cel", $cel);
      $query->bindParam(":email", $email);
      $query->bindParam(":password", $password);
      $query->execute();


    }
    
    public function showUser($id){
     
     $slq   = "SELECT *FROM users WHERE user_id=:id";
     $query =  $this->con->prepare($slq);
     $query->bindParam(":id", $id);
     $query->execute();

     $json = array();

     foreach ($query as $info) {
      
      $json[] = $info;

     }
 
     echo json_encode($json);

    } 

     public function updateUsers($user_name, $phone, $cel, $email, $password, $id){

      $sql = "UPDATE users SET user_name=:user_name, phone=:phone,
      cel=:cel, email=:email, password=:password 
      WHERE user_id=:user_id";
    
      $query = $this->con->prepare($sql);
      $query->bindParam(":user_name", $user_name);
      $query->bindParam(":phone", $phone);
      $query->bindParam(":cel", $cel);
      $query->bindParam(":email", $email);
      $query->bindParam(":password", $password); 
      $query->bindParam(":user_id", $id);
      $query->execute();


    }



   }
  
   //$user = new users();
  
  
 
 

 ?>