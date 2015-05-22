<?php

include '../secure/credentials.php';

$mysqli = new mysqli($dbserver,$dbusername,$dbpassword,$dbname);

$productName = $_POST['productName'];
$productInfo = $_POST['productInfo'];
$subcategoryID = $_POST['subcategoryID'];
$categoryID = $_POST['categoryID'];
$retailerID = $_POST['retailerID'];

$req = "INSERT INTO product (productID, productName, productInfo, subcategoryID, categoryID, retailerID) VALUES ('','$productName','$productInfo','$subcategoryID','$categoryID','$retailerID')";

$res = mysqli_query($mysqli, $req);

if($res){
    echo "Product has been successfully added";
}else{
    echo mysqli_connect_error();
}


?>