<?php

include '../secure/credentials.php';

$mysqli = new mysqli($dbserver,$dbusername,$dbpassword,$dbname);

$productID = $_POST['productID'];
$productName = $_POST['productName'];
$productInfo = $_POST['productInfo'];
$subcategoryID = $_POST['subcategoryID'];
$categoryID = $_POST['categoryID'];

$req = "UPDATE product SET productName='$productName',productInfo='$productInfo',subcategoryID='$subcategoryID',categoryID='$categoryID' WHERE productID='$productID'";

$res = mysqli_query($mysqli, $req);

if($res){
    echo "Product has been successfully updated";
}else{
    echo mysqli_connect_error();
}

?>