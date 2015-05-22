<?php

function run_query($query){
    include '../secure/credentials.php';
    
    $mysqli = new mysqli($dbserver,$dbusername,$dbpassword,$dbname);
    
    $res = mysqli_query($mysqli, $query);
    $queryResultArray = mysqli_fetch_array($res, MYSQLI_ASSOC);
    return $queryResultArray;
}

function get_product($itemID, $itemType){
    
    $resultsArray;
    
    $columnName = $itemType."ID";
    
    $req = "SELECT * FROM $itemType WHERE $columnName='$itemID'";
    $resultsArray = run_query($req);
    if($itemType=="subcategory" || $itemType == "product"){
        $categoryID = $resultsArray['categoryID'];
        if($categoryID){
            $subReq = "SELECT categoryName, retailerID FROM category WHERE categoryID='$categoryID'";
            $subResults = run_query($subReq);
            $resultsArray['categoryName'] = $subResults['categoryName'];
            $resultsArray['retailerID'] = $subResults['retailerID'];
        }
        $subcategoryID = $resultsArray['subcategoryID'];
        if($subcategoryID){
            $prodReq = "SELECT subcategoryName FROM subcategory WHERE subcategoryID='$subcategoryID'";
            $prodResults = run_query($prodReq);
            $resultsArray['subcategoryName'] = $prodResults['subcategoryName'];
        }
        
    }
    
    return $resultsArray;
}


$getID = $_POST['itemID'];
$getType = $_POST['itemType'];
$getArray = get_product($getID, $getType);
$returnArray = json_encode($getArray);
echo $returnArray;

?>