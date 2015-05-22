<?php

include 'getarray.php';

$categoryID = $_POST['categoryID'];

$resultArray = get_subcategory_array($categoryID);

$returnArray = json_encode($resultArray);

echo $returnArray;


?>