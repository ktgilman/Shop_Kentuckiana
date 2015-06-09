<?php

include '../secure/credentials.php';
include 'runproductquery.php';

$mysqli = new mysqli($dbserver,$dbusername,$dbpassword,$dbname);

$productName = $_POST['productName'];
$productInfo = $_POST['productInfo'];
$subcategoryID = $_POST['subcategoryID'];
$categoryID = $_POST['categoryID'];
$retailerID = $_POST['retailerID'];

$optionCheck = true;
$count = 0;
$optionArray;
while($optionCheck){
    $checkNameString = "optionName".$count;
    $checkPriceString = "optionPrice".$count;
    $checkInfoString = "optionInfo".$count;
    if($_POST[$checkNameString]!="" && $_POST[$checkPriceString]!=0){
        $optionArray[$count] = array(
            'optionName' => $_POST[$checkNameString],
            'optionPrice' => $_POST[$checkPriceString],
            'optionInfo' => $_POST[$checkInfoString]
        );
        
        
        $count++;
    }else{
        $optionCheck = false;
    }
}


$isOkay = 1;

$req = "INSERT INTO product (productID, productName, productInfo, subcategoryID, categoryID, retailerID) VALUES ('','$productName','$productInfo','$subcategoryID','$categoryID','$retailerID')";

$res = mysqli_query($mysqli, $req);

if($res){
    
    $productReq = "SELECT productID from product WHERE productName='$productName' AND retailerID='$retailerID'";
    $productRes = run_query($productReq);
    $productID = $productRes['productID'];
    
    //Insert Options into productoption table
    if(isset($optionArray)){
        for($b = 0; $b<count($optionArray);$b++){
            $insertName = $optionArray[$b]['optionName'];
            $insertPrice = $optionArray[$b]['optionPrice'];
            $insertInfo = $optionArray[$b]['optionInfo'];
            $optionInsertReq = "INSERT INTO productoption (optionID, optionName, optionPrice, optionInfo, productID) VALUES ('','$insertName','$insertPrice','$insertInfo','$productID')";
            $optionRes = mysqli_query($mysqli, $optionInsertReq);
            ($optionRes ? $isOkay = 1 : $isOkay = 0);
        }
        
    }
    
    //Insert images into productimage table
    include 'uploadphoto.php';
    if(isset($imgArray)){
        $imgCount = count($imgArray);
        for($a=0;$a<$imgCount;$a++){
            $primary = 0;
            if($a==0){
                $primary = 1;
            }
            $imgReq = "INSERT INTO productimage (productImageID,productImageName,productImageInfo,productImage,isPrimary,productID) VALUES ('','','','$imgArray[$a]','$primary','$productID')";
    
            $imgRes = mysqli_query($mysqli, $imgReq);
        
            if(!$res || !$imgRes){
                $isOkay=0;
            }
        }
        if($isOkay){
            if($imgCount=="1"){
                echo "Product has been successfully updated and 1 image has been added";
            }else{
                echo "Product has been successfully updated and $imgCount images have been added";
            }
            
        }else{
            echo mysqli_connect_error();
        }
        
    }else{
        if($res){
            echo "Product has been successfully updated";
        }else{
            echo mysqli_connect_error();
        }
    }
}else{
    echo mysqli_connect_error();
}


?>