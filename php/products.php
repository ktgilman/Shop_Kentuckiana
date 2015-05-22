<?php



include '../secure/credentials.php';
$mysqli = new mysqli($dbserver,$dbusername,$dbpassword,$dbname);

function Get_SQL_Array($request){
    global $mysqli;
    $resultsArray;
    $res = mysqli_query($mysqli, $request);
    while($holdingArray = mysqli_fetch_array($res, MYSQLI_ASSOC)){
        $resultsArray[] = $holdingArray;
    }
    return $resultsArray;
    
}


$returnArray;
$loggedIn = false;
$username = $_POST['username'];
$password = $_POST['password'];
//Get retailer info from retailer table
    $retailer_result = Get_SQL_Array("SELECT * FROM retailer WHERE username='$username'");
    $retailerID = $retailer_result[0]['retailerID'];
    $checkPassword = $retailer_result[0]['password'];
    $retailerName = $retailer_result[0]['retailerName'];


//Ensure user is still logged in and credentials are correct.
    if($checkPassword == $password){
        $loggedIn = true;
    
        //Get info from categories, subcategories, and products
        $category_result = Get_SQL_Array("SELECT * FROM category WHERE retailerID = '$retailerID' ORDER BY categoryName");
        for($a=0;$a<count($category_result);$a++){
            $categoryID = $category_result[$a]['categoryID'];
            $subcategory_result = Get_SQL_Array("SELECT * FROM subcategory WHERE categoryID ='$categoryID' ORDER BY subcategoryName");
            for($b=0;$b<count($subcategory_result);$b++){
                $subcategoryID = $subcategory_result[$b]['subcategoryID'];
                $product_result = Get_SQL_Array("SELECT * FROM product WHERE subcategoryID = '$subcategoryID' ORDER BY productName");
                $subcategory_result[$b]['product'] = $product_result;
            }
            $category_result[$a]['subcategory'] = $subcategory_result;
            
            //get products with a category but no subcategory
            $semi_loose_product_result = Get_SQL_Array("SELECT * FROM product WHERE categoryID='$categoryID' AND subcategoryID='0' ORDER BY productName");
            $category_result[$a]['semiLooseProduct'] = $semi_loose_product_result;
        }
        
        //Get info for products without a category
        $loose_product_result = Get_SQL_Array("SELECT * FROM product WHERE retailerID='$retailerID' AND categoryID='0' ORDER BY productName");
    
    
        $returnArray = array(
            'loggedIn' => $loggedIn,
            'retailerID' => $retailerID,
            'checkPassword' => $checkPassword,
            'retailerName' => $retailerName,
            'categoryResult' => $category_result,
            'looseProduct' => $loose_product_result
        );
        
    }else{
        $returnArray = array(
        'loggedIn' => $loggedIn
        );
    }



$returnJSON = json_encode($returnArray);

echo $returnJSON;
?>