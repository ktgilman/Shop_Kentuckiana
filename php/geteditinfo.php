<?php

include '../secure/credentials.php';
include 'getarray.php';
include 'runproductquery.php';

$mysqli = new mysqli($dbserver, $dbusername, $dbpassword, $dbname);

$itemID = $_POST['itemID'];
$itemType = $_POST['editType'];
$retailerID = $_POST['retailerID'];
$resultArray;

if($itemType == 'category'){
    $req = "SELECT * FROM category WHERE categoryID='$itemID'";
    $res = mysqli_query($mysqli, $req);
    if($res){
        $categoryArray = mysqli_fetch_array($res, MYSQLI_ASSOC);
        $resultArray = $categoryArray;
    }
}elseif($itemType == 'subcategory'){
    $req = "SELECT * FROM subcategory WHERE subcategoryID='$itemID'";
    $res = mysqli_query($mysqli, $req);
    if($res){
        $subCatArray = mysqli_fetch_array($res, MYSQLI_ASSOC);
        $subCatArray['categorylist'] = get_category_array($retailerID);
        $resultArray = $subCatArray;
    }
    
}elseif($itemType == 'product'){
    $req = "SELECT * FROM product WHERE productID='$itemID'";
    $res = mysqli_query($mysqli, $req);
    if($res){
        $prodArray = mysqli_fetch_array($res, MYSQLI_ASSOC);
        $catList = get_cat_and_subcat_array($retailerID);
        $prodArray['categorylist'] = $catList;
        $imgReq = "SELECT * FROM productimage WHERE productID='$itemID'";
        $prodArray['images'] = run_query($imgReq, true);
        $optionReq = "SELECT * FROM productoption WHERE productID='$itemID' ORDER BY optionName";
        $prodArray['options'] = run_query($optionReq, true);
        $resultArray = $prodArray;
    }
}

$returnArray = json_encode($resultArray);
echo $returnArray;

?>