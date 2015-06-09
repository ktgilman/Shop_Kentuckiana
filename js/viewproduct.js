function viewproduct(itemID, itemType){
    $.ajax({
        url:'php/getproduct.php',
        method: 'POST',
        data: {
            'itemID':itemID,
            'itemType':itemType
        },
        dataType: 'json',
        success: function(response){
            $fullPageDiv = $('<div class="fullPage"></div>');
    
            if (itemType=="category") {
                $categoryDiv = $('<div class="lightBox"></div>');
                $categoryDiv.append('<h4>'+response['categoryName']+'</h4>');
                
                $categoryDiv.append('<div id="info">'+response['categoryInfo']+'</div>');
                $categoryDiv.append('<button id="editCategory" onclick="editProduct('+itemID+',\''+itemType+'\')">Edit Category</button>');
                $categoryDiv.append('<button id="deleteCategory" onclick="deleteProduct('+itemID+',\''+itemType+'\')">Delete Category</button>');
                $categoryDiv.append('<button id="closeBox" onclick="closeBox()">Close Box</button>');
                $fullPageDiv.append($categoryDiv);
                
            }else if (itemType=="subcategory") {
                $subcategoryDiv = $('<div class="lightBox"></div>');
                $subcategoryDiv.append('<h4>'+response['subcategoryName']+'</h4>');
                $subcategoryDiv.append('<p>Category: '+response['categoryName']+'</p>');
                $subcategoryDiv.append('<div id="info">'+response['subcategoryInfo']+'</div>');
                $subcategoryDiv.append('<button id="editSubcategory" onclick="editProduct('+itemID+',\''+itemType+'\','+response['retailerID']+')">Edit Subcategory</button>');
                $subcategoryDiv.append('<button id="deleteSubcategory" onclick="deleteProduct('+itemID+',\''+itemType+'\')">Delete Subcategory</button>');
                $subcategoryDiv.append('<button id="closeBox" onclick="closeBox()">Close Box</button>');
                $fullPageDiv.append($subcategoryDiv);
            }else if (itemType=="product") {
                $prodDiv = $('<div class="lightBox"></div>');
                $prodDiv.append('<h4>'+response['productName']+'</h4>');
                if (response['categoryName']) {
                    $prodDiv.append('<p>Category: '+response['categoryName']+'</p>');
                }
                if (response['subcategoryName']) {
                    $prodDiv.append('<p>Subcategory: '+response['subcategoryName']+'</p>');
                }
                $prodDiv.append('<div id="info">'+response['productInfo']+'</div>');
                console.log(response['productInfo']);
                
                $prodDiv.append('<button id="editProduct" onclick="editProduct('+itemID+',\''+itemType+'\','+response['retailerID']+')">Edit Product</button>');
                $prodDiv.append('<button id="deleteProduct" onclick="deleteProduct('+itemID+',\''+itemType+'\')">Delete Product</button>');
                $prodDiv.append('<button id="closeBox" onclick="closeBox()">Close Box</button>');
                $fullPageDiv.append($prodDiv);
            }
            
            
            $('body').append($fullPageDiv);
            
        }
    });
    

}