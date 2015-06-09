<?php

    function deleteImage($imageID){
        include '../secure/credentials.php';
        $mysqli = new mysqli($dbserver,$dbusername,$dbpassword,$dbname);
        
        $req = "SELECT productImage FROM productimage WHERE productImageID='$imageID'";
        $res = mysqli_query($mysqli, $req);
        if($res){
            $resultArray = mysqli_fetch_array($res, MYSQLI_ASSOC);
            $deleteURL = $resultArray['productImage'];
            unlink($deleteURL);
            $deleteReq = "DELETE FROM productimage WHERE productImageID='$imageID'";
            $deleteRes = mysqli_query($mysqli, $deleteReq);
            if($deleteRes){
                echo "$deleteURL has been deleted";
            }else{
                echo mysqli_error();
            }
        }
    }
    
    function makePrimary($imageID){
        include '../secure/credentials.php';
        $mysqli = new mysqli($dbserver, $dbusername, $dbpassword, $dbname);
    
        $req = "SELECT productID FROM productimage WHERE productImageID='$imageID'";
        $res = mysqli_query($mysqli, $req);
        $resultArray = mysqli_fetch_array($res, MYSQLI_ASSOC);
        $productID = $resultArray['productID'];
        $existingReq = "SELECT productImageID FROM productimage WHERE isPrimary = true AND productID='$productID'";
        $existingRes = mysqli_query($mysqli, $existingReq);
        if($existingRes){
            $newresultArray = mysqli_fetch_array($existingRes, MYSQLI_ASSOC);
            $toggleOff = $newresultArray['productImageID'];
            //$switchRes;
            //if($toggleOff){
                $switchReq = "UPDATE productimage SET isPrimary = false WHERE productImageID = '$toggleOff'; ";
                $switchReq.= "UPDATE productimage SET isPrimary = true WHERE productImageID = '$imageID'";
                $switchRes = mysqli_multi_query($mysqli, $switchReq);
            /*}else{
                $switchReq = "UPDATE productimage SET isPrimary = true WHERE productImageID = '$imageID'";
                $switchRes = mysqli_query($mysqli, $switchReq);
            }*/
            
            if($switchRes){
                if($toggleOff){
                    echo "1";  //means there was a primary image already set.
                }else{
                    echo "0";  //means there was no primary image already set/
                }
            }else{
                echo "Couldn't update Primary Image";
                echo mysqli_error();
            }
        }else{
            echo "No Existing Primary Image";
            echo mysqli_error();
        }
    }
    
    $productImageID = $_POST['imageID'];
    $editType = $_POST['editType'];
    
    if($editType=="delete"){
        deleteImage($productImageID);
    }else if($editType=="makePrimary"){
        makePrimary($productImageID);
    }else{
        echo "An edit type has not been selected";
    }
    
    
    

?>