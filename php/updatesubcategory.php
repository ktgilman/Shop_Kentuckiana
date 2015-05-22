<?php

include '../secure/credentials.php';

$mysqli = new mysqli($dbserver,$dbusername,$dbpassword,$dbname);

$subcategoryID = $_POST['subcategoryID'];
$subcategoryName = $_POST['subcategoryName'];
$subcategoryInfo = $_POST['subcategoryInfo'];
$categoryID = $_POST['categoryID'];

$req = "UPDATE subcategory SET subcategoryName='$subcategoryName',subcategoryInfo='$subcategoryInfo',categoryID='$categoryID' WHERE subcategoryID='$subcategoryID'";

$res = mysqli_query($mysqli, $req);

if($res){
    echo 'Subcategory has been updated';
}else{
    echo mysqli_connect_error();
}

?>