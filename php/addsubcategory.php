<?php

include '../secure/credentials.php';

$mysqli = new mysqli($dbserver,$dbusername,$dbpassword,$dbname);

$subcategoryName = $_POST['subcategoryName'];
$subcategoryInfo = $_POST['subcategoryInfo'];
$categoryID = $_POST['categoryID'];

$req = "INSERT INTO subcategory (subcategoryID, subcategoryName, subcategoryInfo, categoryID) VALUES ('','$subcategoryName','$subcategoryInfo','$categoryID')";

$res = mysqli_query($mysqli, $req);

if($res){
    echo "You have successfully added a new Subcategory";
}else{
    echo mysqli_connect_error();
}



?>