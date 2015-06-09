function getProducts(event){    
    if (event) {
       event.preventDefault(); 
    }
    
    $('.visible').hide();
    var $newDiv = $('<div class="visible"></div>');
    var $leftDiv = $('<div class="leftSide"></div>');
    var $rightDiv = $('<div class="rightSide"></div>');
    
    $.ajax({
        url: 'php/products.php',
        method: 'POST',
        data: {
            'username':'kevin',
            'password':'gilman'
        },
        dataType: 'json',
        success: function(response){
            if (response['loggedIn']){
                //Add Retailer's Name to SubTitle
                var retailerName = response['retailerName'];
                var retailerID = response['retailerID'];
                $newDiv.append('<h3>'+retailerName+'\'s Products</h3>');
                
                //Print all categories,subcategories, and products
                var categoryResult = response['categoryResult'];
                $productList = $('<ul class="prodList"></ul>');
                if (categoryResult) {
                    for(var a=0; a< categoryResult.length; a++){
                        $catTemp = $('<ul></ul>');
                        $catTemp.append(createListItem("category", "category", categoryResult[a]['categoryName'], categoryResult[a]['categoryID'], retailerID));
                        var subCatResultsArray = categoryResult[a]['subcategory'];
                        if (subCatResultsArray) {
                            $subCatTemp = $('<ul></ul>');
                            for(var b=0; b < subCatResultsArray.length; b++){
                                $subCatTemp.append(createListItem("subcategory", "subcategory", subCatResultsArray[b]['subcategoryName'], subCatResultsArray[b]['subcategoryID'], retailerID));
                                var prodResultsArray = subCatResultsArray[b]['product'];
                                if (prodResultsArray) {
                                    $prodTemp = $('<ul></ul>');
                                    for(var c=0; c< prodResultsArray.length; c++){
                                        $prodTemp.append(createListItem("product", "product", prodResultsArray[c]['productName'],prodResultsArray[c]['productID'], retailerID));
                                    }
                                
                                    $subCatTemp.append($prodTemp);
                                }
                                
                            }
                            $catTemp.append($subCatTemp);
                        }
                        var semiLooseProduct = categoryResult[a]['semiLooseProduct'];
                        if (semiLooseProduct) {
                            for(var m=0; m< semiLooseProduct.length; m++){
                                $catTemp.append(createListItem("semiLooseProduct", "product", semiLooseProduct[m]['productName'],semiLooseProduct[m]['productID'], retailerID));
                            }
                        }
                        $productList.append($catTemp);
                    }
                }
                
                
                //Get all the loose products (products without categories or subcategories)
                var looseProduct = response['looseProduct'];
                var $looseProductUL = $('<ul class="looseProductUL"></ul>');
                if (looseProduct) {
                   for(var x=0; x<looseProduct.length; x++){
                    $looseProductUL.append(createListItem("looseProduct", "product", looseProduct[x]['productName'], looseProduct[x]['productID'], retailerID));
                    } 
                }
                
                
                
                $productList.append($looseProductUL);
                
                
                //add product list to the left side div
                $leftDiv.append($productList);
                
                
                
                //add options to the right Div of page
                $optionsList = $('<ul id="options"></ul>');
                $optionsList.append('<li><button id="addProduct" onclick="addProduct('+retailerID+')">Add Product</button></li>');
                $optionsList.append('<li><button id="addSubcategory" onclick="addSubCategory('+retailerID+')">Add Subcategory</button></li>');
                $optionsList.append('<li><button id="addCategory" onclick="addCategory('+retailerID+')">Add Category</button></li>');
                $rightDiv.append($optionsList);
                
                //add right and left div's to main product page div
                $newDiv.append($leftDiv);
                $newDiv.append($rightDiv);
                
            }else{
                //If user is not logged in, display message with link to log in.
                $newDiv.append('<h3>We\'re sorry, you must log in before you can access that content</h3>');
            }
            
        }
    });
    
    $('section').append($newDiv);
    
    
}

function createListItem(indentType, editType, itemName, itemID, retailer) {
    $newLI = $('<li></li>');
    $newButton = $('<button class="'+indentType+'" onclick="viewproduct('+itemID+',\''+editType+'\')"></button><br>');
    $newButton.append('<p>'+itemName+'</p>');
    $newLI.append($newButton);
        $editDeleteDiv = $('<div class="'+indentType+' editDelete"></div>');
    $editDeleteDiv.append('<a href="#" id="deleteProduct" onclick="deleteProduct('+itemID+',\''+editType+'\')"><img src="img/delete.png"></a>')
    $editDeleteDiv.append('<a href="#" id="editProduct" onclick = "editProduct('+itemID+',\''+editType+'\',\''+retailer+'\')"><img src="img/edit.png"></a><br>');
    $newLI.append($editDeleteDiv);
    
    return $newLI;
}

$('#products').click(getProducts);