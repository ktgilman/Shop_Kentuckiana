<?php

include '../secure/credentials.php';
include 'uploadphoto.php';
include 'runproductquery.php';

$mysqli = new mysqli($dbserver,$dbusername,$dbpassword,$dbname);

$productID = $_POST['productID'];
$productName = $_POST['productName'];
$productInfo = $_POST['productInfo'];
$subcategoryID = $_POST['subcategory'];
$categoryID = $_POST['category'];
$optionName = $_POST['optionName'];
$optionInfo = $_POST['optionInfo'];
$optionPrice = $_POST['optionPrice'];

$isOkay = 1;

$req = "UPDATE product SET productName='$productName',productInfo='$productInfo',subcategoryID='$subcategoryID',categoryID='$categoryID' WHERE productID='$productID'";

$res = mysqli_query($mysqli, $req);

if(isset($optionName)){
    $optionReq = "INSERT INTO productoption (optionID, optionName, optionPrice, optionInfo, productID) VALUES ('','$optionName','$optionPrice','$optionInfo','$productID')";
    $optionRes = mysqli_query($mysqli, $optionReq);
    if(!$optionRes){
        echo "Error: "+mysqli_error();
    }
}
if($imgArray){
    $createPrimary = false;
    $checkPrimary = "SELECT productImageID FROM productimage WHERE productID='$productID' AND isPrimary='1'";
    $primaryResult = run_query($checkPrimary);
    if(!isset($primaryResult)){
        $createPrimary = true;
    }
    
    $imgCount = count($imgArray);
    for($a=0;$a<$imgCount;$a++){
        $primaryInput = 0;
        if($createPrimary && $a == 0){
            $primaryInput = 1;
        }
        $imgReq = "INSERT INTO productimage (productImageID,productImageName,productImageInfo,productImage,isPrimary,productID) VALUES ('','','','$imgArray[$a]','$primaryInput','$productID')";

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




?>