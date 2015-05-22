<?php

function get_category_array($retailer){
    include '../secure/credentials.php';

    $mysqli = new mysqli($dbserver, $dbusername, $dbpassword,$dbname);
    
    $req = "SELECT categoryName,categoryID FROM category WHERE retailerID='$retailer' ORDER BY categoryName";

    $res = mysqli_query($mysqli, $req);
    
    if($res){
        $resultsArray;
        while($rowArray = mysqli_fetch_array($res, MYSQLI_ASSOC)){
            $resultsArray[] = $rowArray;
        }
        
        return $resultsArray;
        
    }else{
        echo mysqli_connect_error();
    }
}

function get_subcategory_array($category){
    include '../secure/credentials.php';
    
    $mysqli = new mysqli($dbserver,$dbusername,$dbpassword,$dbname);
    
    $resultArray;
    $req= "SELECT subcategoryID,subcategoryName FROM subcategory WHERE categoryID = '$category' ORDER BY subcategoryName";

    $res = mysqli_query($mysqli, $req);
    
    if($res){
        while($requestArray = mysqli_fetch_array($res, MYSQLI_ASSOC)){
            $resultArray[] = $requestArray;
        }
        return $resultArray;
    }else{
        echo mysqli_connect_error();
    }
}

function get_cat_and_subcat_array($retailer){
    include '../secure/credentials.php';
    
    $mysqli = new mysqli($dbserver, $dbusername, $dbpassword, $dbname);
        
    $req = "SELECT categoryName,categoryID FROM category WHERE retailerID='$retailer' ORDER BY categoryName";

    $res = mysqli_query($mysqli, $req);
    
    if($res){
        $resultsArray;
        $count = 0;
        while($rowArray = mysqli_fetch_array($res, MYSQLI_ASSOC)){
            $resultsArray[] = $rowArray;
            $categoryID = $rowArray['categoryID'];
            $newReq = "SELECT subcategoryName,subcategoryID FROM subcategory WHERE categoryID='$categoryID' ORDER BY subcategoryName";
            $newRes = mysqli_query($mysqli,$newReq);
            if($newRes){
                while($subRowArray = mysqli_fetch_array($newRes, MYSQLI_ASSOC)){
                    $resultsArray[$count]['subcategory'][] = $subRowArray;
                }
            }
            $count++;
        }
        
        return $resultsArray;
        
    }else{
        echo mysqli_connect_error();
    }
    
}

?>