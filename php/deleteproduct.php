<?php

include '../secure/credentials.php';

$mysqli = new mysqli($dbserver,$dbusername,$dbpassword,$dbname);

$deleteType = $_POST['deleteType'];
$itemID = $_POST['itemID'];
$deleteIdentifier = $deleteType."ID";
$subRes;
$catRes;
$catProdRes;

$req = "DELETE FROM $deleteType WHERE $deleteIdentifier='$itemID'";

$res = mysqli_query($mysqli, $req);

if($res){

    if($deleteType=="subcategory"){
        $subReq = "UPDATE product SET subcategoryID='0' WHERE subcategoryID = '$itemID'";
        $subRes = mysqli_query($mysqli, $subReq);
        if($subRes){
            echo "The $deleteType has been deleted";
        }else{
            echo mysqli_connect_error();
        }
    }elseif($deleteType=="category"){
        $catReq = "DELETE FROM subcategory WHERE categoryID = '$itemID'";
        $catRes = mysqli_query($mysqli, $catReq);
        $catProdReq = "UPDATE product SET subcategoryID='0',categoryID='0' WHERE categoryID='$itemID'";
        $catProdRes = mysqli_query($mysqli, $catProdReq);
        if($catRes && $catProdRes){
            echo "The $deleteType has been deleted";
        }else{
            echo mysqli_connect_error();
        }
    }else{
        echo "The $deleteType has been deleted";
    }
    
    
}else{
    echo mysqli_connect_error();
}

?>
