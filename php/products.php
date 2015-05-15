<?php

include '../secure/credentials.php';

$mysqli = new mysqli($dbserver,$dbusername,$dbpassword,$dbname);

$req = "SELECT * FROM retailer WHERE retailerID='5555'";
$res = mysqli_query($mysqli, $req);
$resultsArray = mysqli_fetch_array($res, MYSQLI_ASSOC);
$firstName = $resultsArray['firstName'];

echo $firstName;
?>