<?php

function run_query($query, $multiple_rows){
    include '../secure/credentials.php';
    
    $mysqli = new mysqli($dbserver,$dbusername,$dbpassword,$dbname);
    $queryResultArray;
    $res = mysqli_query($mysqli, $query);
    if($multiple_rows){
        while($loopArray = mysqli_fetch_array($res, MYSQLI_ASSOC)){
            $queryResultArray[] = $loopArray;
        }
        return $queryResultArray;
    }else{
        $queryResultArray = mysqli_fetch_array($res, MYSQLI_ASSOC);
        return $queryResultArray;  
    }
    
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
        if($itemType=="product"){
            $imgReq = "SELECT * FROM productimage WHERE productID='$itemID'";
            $imgResults = run_query($imgReq, true);
            $resultsArray['images'] = $imgResults;
            $optReq = "SELECT * FROM productoption WHERE productID='$itemID' ORDER BY optionName";
            $optResults = run_query($optReq, true);
            $resultsArray['options'] = $optResults;
        }
        
    }
    
    return $resultsArray;
}