<?php
    include '../secure/credentials.php';
    
    $mysqli = new mysqli($dbserver,$dbusername,$dbpassword,$dbname);
    
    $optionID = $_POST['optionID'];
    $optionName = $_POST['optionName'];
    $optionInfo = $_POST['optionInfo'];
    $optionPrice = $_POST['optionPrice'];
    $productID = $_POST['productID'];
    $type = $_POST['type'];
    
    if($type == "edit"){
        $req = "UPDATE productoption SET optionName='$optionName',optionInfo='$optionInfo',optionPrice='$optionPrice' WHERE optionID='$optionID'";
    
        $res = mysqli_query($mysqli, $req);
        
        if($res){
            echo "Option has been updated";
        }else{
            echo "Error"+mysqli_error();
        }
    }elseif($type == "add"){
        $req = "INSERT INTO productoption (optionID, optionName,optionInfo,optionPrice, productID) VALUES ('','$optionName','$optionInfo','$optionPrice','$productID')";
        
        $res = mysqli_query($mysqli, $req);
        
        if($res){
            
            $idReq = "SELECT optionID FROM productoption WHERE optionName='$optionName' AND productID='$productID'";
            $idRes = mysqli_query($mysqli, $idReq);
            
            if($idRes){
                $newArray = mysqli_fetch_array($idRes, MYSQLI_ASSOC);
                $returnID = $newArray['optionID'];
                echo $returnID;
            }else{
                echo "Error: ".mysqli_error();
            }
            
        }else{
            echo "Error: ".mysqli_error();
        }
    }
    

?>