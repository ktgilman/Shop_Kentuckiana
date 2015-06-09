<?php

include 'runproductquery.php';

$optionID = $_POST['optionID'];

$req = "SELECT * FROM productoption WHERE optionID = '$optionID'";

$result = run_query($req);

$returnArray = json_encode($result);

echo $returnArray;

?>