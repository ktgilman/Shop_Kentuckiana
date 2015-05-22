<?php

include 'getarray.php';

$retailerID = $_POST['retailerID'];

$category_array = get_category_array($retailerID);

$returnArray = json_encode($category_array);
        
echo $returnArray;


?>