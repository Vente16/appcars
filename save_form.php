<?php 

     $target_dir = "upload/";
     $name = $_POST['name'];
     print_r($_FILES);
     $target_file = $target_dir . basename($_FILES["file"]["name"]);
     $description = $_POST['description'];
     $price = $_POST['price'];
     echo "Descripcion: ".$description."  ---- ";
     echo "Precio: ".$price. " ---- ";

     if(move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)){
     	echo "Sí: ".$target_file;
     }else{
     	echo "No";
     }






 ?>