<?php

$count = 0;
$loop = true;
$imgArray;

if(!isset($productID)){
    $productID = $_POST['productID'];
}

while($loop){
    $check = "fileToUpload".$count;
    $uploadOk = 1;
    if($_FILES[$check]["name"]){
        $target_dir = "../imguploads/prodimg/";
    
        $target_file = $target_dir .$productID. basename($_FILES[$check]["name"]);
        
        $imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
        
        // Check if image file is a actual image or fake image
        if(isset($_POST["submit"])) {
            $check = getimagesize($_FILES[$check]["tmp_name"]);
            if($check !== false) {
                //For Debugging: echo "File is an image - " . $check["mime"] . ".";
                $uploadOk = 1;
            } else {
                //For Debuggin: echo "File is not an image.";
                $uploadOk = 0;
            }
        }
        
        // Check if file already exists
        if (file_exists($target_file)) {
            //For Debugging: echo "Sorry, file already exists.";
            $uploadOk = 0;
        }
        
        // Check file size
        if ($_FILES[$check]["size"] > 500000) {
            //For Debugging: echo "Sorry, your file is too large.";
            $uploadOk = 0;
        }
        
        // Allow certain file formats
        if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
        && $imageFileType != "gif" ) {
            //For Debugging: echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
            $uploadOk = 0;
        }
        
        // Check if $uploadOk is set to 0 by an error
        if ($uploadOk == 0) {
            //For Debugging: echo "Sorry, your file was not uploaded.";
            
        // if everything is ok, try to upload file
        } else {
            if (move_uploaded_file($_FILES[$check]["tmp_name"], $target_file)) {
                //For Debugging: echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
                //For Debugging: echo $_FILES["fileToUpload"]["tmp_name"];
                $imgArray[]=$target_file;
            } else {
                //For Debugging: echo "Sorry, there was an error uploading your file.";
            }
        }
    }elseif($_FILES[$check]){
        $loop=false;
    }
    $count++;
}

?>