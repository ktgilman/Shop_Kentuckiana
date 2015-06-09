<?php

include 'runproductquery.php';

$getID = $_POST['itemID'];
$getType = $_POST['itemType'];
$getArray = get_product($getID, $getType);
$returnArray = json_encode($getArray);
echo $returnArray;

?>