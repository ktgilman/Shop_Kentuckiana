<?php

include '../secure/credentials.php';

$mysqli = new mysqli($dbserver, $dbusername, $dbpassword, $dbname);

$categoryID = $_POST['categoryID'];
$categoryName = $_POST['categoryName'];
$categoryInfo = $_POST['categoryInfo'];

$req = "UPDATE category SET categoryName='$categoryName',categoryInfo='$categoryInfo' WHERE categoryID='$categoryID'";

$res = mysqli_query($mysqli,$req);

if($res){
    echo 'Category has been updated';
}else{
    echo mysqli_connect_error();
}


?>