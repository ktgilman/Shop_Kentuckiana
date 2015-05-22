<?php

include '../secure/credentials.php';

$mysqli = new mysqli($dbserver,$dbusername,$dbpassword,$dbname);

$categoryName = $_POST['categoryName'];
$categoryInfo = $_POST['categoryInfo'];
$retailerID = $_POST['retailerID'];

$req = "INSERT INTO category (categoryID,categoryName,categoryInfo,retailerID) VALUES ('','$categoryName','$categoryInfo','$retailerID')";

$res = mysqli_query($mysqli, $req);

if($res){
    echo "Category has been successfully added!";
}else{
    echo mysqli_error($mysqli);
}




?>