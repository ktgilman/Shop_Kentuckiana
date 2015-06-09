function editProduct(itemID, itemType, retailerID){
    $.ajax({
        url:'php/geteditinfo.php',
        method: 'POST',
        data: {
            'itemID':itemID,
            'editType':itemType,
            'retailerID':retailerID
        },
        dataType: 'json',
        success: function(response){
            $fullPageDiv = $('<div class="fullPage"></div>');
            
            if (itemType=='category') {
                $categoryDiv = $('<div class="lightBox"></div>');
            
                $categoryDiv.append('<h4>Edit Category</h4>');
                
                $categoryDiv.append('<label for="categoryName">Category Name</label><br><input type="text" id="categoryName" value="'+response['categoryName']+'"><br>');
                $categoryDiv.append('<label for="categoryInfo">Category Info</label><br><textarea id="categoryInfo">'+response['categoryInfo']+'</textarea><br>');
                $categoryDiv.append('<input type="hidden" id="categoryID" value="'+response['categoryID']+'">');
                $categoryDiv.append('<button id="updateCatButton">Update Category</button>');
                $categoryDiv.append('<button id="closeBox" onclick="closeBox()">Close Box</button>');
                $fullPageDiv.append($categoryDiv);
                $('body').append($fullPageDiv);
                CKEDITOR.replace('categoryInfo');
                $('#updateCatButton').click(updateCatToDB);
            }else if (itemType == 'subcategory') {
                $subcategoryDiv = $('<div class="lightBox"></div>');
                $subcategoryDiv.append('<h4>Edit a Subcategory</h4>');
                
                    $topNav = $('<ul><li><a href="#" onclick="selectBasicInfo()">Basic Info</a></li><li><a href="#" onclick="selectDetailedInfo()">Detailed Info</a></li></ul>');
                    
                $subcategoryDiv.append($topNav);
                
                    $firstPageDiv = $('<div class="firstPage"></div>');
                
                    $firstPageDiv.append('<label for="subcategoryName">Subcategory Name</label><br><input type="text" id="subcategoryName" value="'+response['subcategoryName']+'"><br>');
                    $firstPageDiv.append('<input type="hidden" id="subcategoryID" value="'+response['subcategoryID']+'">');
                    $firstPageDiv.append('<label for="category">Assigned Category</label><br>');
                        $assignCategory = $('<select name="category" id="category"></select>');
                        catList = response['categorylist'];
                        for(var a=0; a<catList.length;a++){
                            if (catList[a]['categoryID']==response['categoryID']) {
                                $catOption = $('<option value="'+catList[a]['categoryID']+'" selected>'+catList[a]['categoryName']+'</option>');
                            }else{
                                $catOption = $('<option value="'+catList[a]['categoryID']+'">'+catList[a]['categoryName']+'</option>');
                            }
                            
                            $assignCategory.append($catOption);
                        }
                    
                    $firstPageDiv.append($assignCategory);
                    
                $subcategoryDiv.append($firstPageDiv);
                
                    $secondPageDiv = $('<div class="secondPage"></div>');
                    
                    $secondPageDiv.append('<label for="subcategoryInfo">Subcategory Info</label><br><textarea id="subcategoryInfo">'+response['subcategoryInfo']+'</textarea><br>');
                
                $subcategoryDiv.append($secondPageDiv);
                
                $subcategoryDiv.append('<button id="updateSubCatButton">Update Subcategory</button>');
                $subcategoryDiv.append('<button id="closeBox" onclick="closeBox()">Close Box</button>');
                $fullPageDiv.append($subcategoryDiv);
                $('body').append($fullPageDiv);
                $('.secondPage').hide();
                CKEDITOR.replace('subcategoryInfo');
                $('#updateSubCatButton').click(updateSubCatToDB);
            }else if (itemType == 'product') {
                $productDiv = $('<div class="lightBox"></div>');
                $productDiv.append('<h4>Edit a Product</h4>');
                    
                    $topNav = $('<ul><li><a href="#" onclick="selectBasicInfo()">Basic Info</a></li><li><a href="#" onclick="selectDetailedInfo()">Detailed Info</a></li></ul>');
                    
                $productDiv.append($topNav);
                
                    $firstPageDiv = $('<div class="firstPage"></div>');
                
                    $firstPageDiv.append('<label for="productName">Product Name</label><br><input type="text" id="productName" value="'+response['productName']+'"><br>');
                    $firstPageDiv.append('<input type="hidden" id="productID" value="'+response['productID']+'">');
                    $firstPageDiv.append('<label for="category">Assigned Category</label><br>');
                        var $catSelect = $('<select name="category" id="category"></select>');
                        $catSelect.append('<option value="0" selected>No Category</option>');
                        var catList = response['categorylist'];
                        var watchSpot;
                        if (catList) {
                            for(var b=0; b<catList.length;b++){
                                if (catList[b]['categoryID']==response['categoryID']) {
                                    $catOption = $('<option value="'+catList[b]['categoryID']+'" selected>'+catList[b]['categoryName']+'</option>');
                                    watchSpot = b;
                                }else{
                                    $catOption = $('<option value="'+catList[b]['categoryID']+'">'+catList[b]['categoryName']+'</option>');
                                }
                                $catSelect.append($catOption);
                            } 
                        }
                    
                    $firstPageDiv.append($catSelect);
                    $firstPageDiv.append('<br><label for="subcategory">Assigned Subcategory</label><br>');
                        var $subCatSelect = $('<select name="subcategory" id="subcategory"></select>');
                        $subCatSelect.append('<option value="0">No Subcategory</option>');
                        if (watchSpot != null) {
                            var subCatList = catList[watchSpot]['subcategory'];
                            if (subCatList) {
                                for(var c=0; c<subCatList.length;c++){
                                    if (subCatList[c]['subcategoryID']==response['subcategoryID']) {
                                        var $subCatOption = $('<option value="'+subCatList[c]['subcategoryID']+'" selected>'+subCatList[c]['subcategoryName']+'</option>');
                                    }else{
                                        var $subCatOption = $('<option value="'+subCatList[c]['subcategoryID']+'">'+subCatList[c]['subcategoryName']+'</option>');
                                    }
                                    $subCatSelect.append($subCatOption);
                                }
                            }
                            
                        }
                    
                    $firstPageDiv.append($subCatSelect);
                $productDiv.append($firstPageDiv);
                
                    $secondPageDiv = $('<div class="secondPage"></div>');
                    $secondPageDiv.append('<br><label for="productInfo">Product Info</label><br><textarea id="productInfo">'+response['productInfo']+'</textarea><br>');
                    $secondPageDiv.append('<input type="hidden" id="retailer" value="'+retailerID+'">');
                
                $productDiv.append($secondPageDiv);
                $productDiv.append('<button id="updateProdButton">Update Product</button>');
                $productDiv.append('<button id="closeBox" onclick="closeBox()">Close Box</button>');
                $fullPageDiv.append($productDiv);
                $('body').append($fullPageDiv);
                $('.secondPage').hide();
                CKEDITOR.replace('productInfo');
                $('#updateProdButton').click(updateProdToDB);
                $('#category').change(getSubCatsFromCat);
            }
            
        }
    });
    
}

function updateCatToDB(event) {
    if (event) {
        event.preventDefault();
    }
    
    var categoryID = $('#categoryID').val();
    var categoryName = $('#categoryName').val();
    var categoryInfo = CKEDITOR.instances.categoryInfo.getData();
    $.ajax({
        url:'php/updatecategory.php',
        method: 'POST',
        data:{
            'categoryID': categoryID,
            'categoryName': categoryName,
            'categoryInfo': categoryInfo
        },
        success: function(response){
            $('.fullPage').remove();
            getProducts();
            viewproduct(categoryID,"category");
            alert(response);
        }
    })
}

function updateSubCatToDB(event) {
    if (event) {
        event.preventDefault();
    }
    
    var subcategoryID = $('#subcategoryID').val();
    var subcategoryName = $('#subcategoryName').val();
    var categoryID = $('#category').val();
    var subcategoryInfo = CKEDITOR.instances.subcategoryInfo.getData();
    
    $.ajax({
        url:'php/updatesubcategory.php',
        method: 'POST',
        data:{
            'subcategoryID':subcategoryID,
            'subcategoryName':subcategoryName,
            'categoryID':categoryID,
            'subcategoryInfo':subcategoryInfo
        },
        success: function(response){
            $('.fullPage').remove();
            getProducts();
            viewproduct(subcategoryID, "subcategory");
            alert(response);
        }
    });
}

function updateProdToDB(event){
    if (event) {
        event.preventDefault();
    }
    
    var productID = $('#productID').val();
    var productName = $('#productName').val();
    var productInfo = CKEDITOR.instances.productInfo.getData();
    var subcategoryID = $('#subcategory').val();
    var categoryID = $('#category').val();
    
    $.ajax({
        url: 'php/updateproduct.php',
        method: 'POST',
        data:{
            'productID':productID,
            'productName':productName,
            'productInfo':productInfo,
            'subcategoryID':subcategoryID,
            'categoryID':categoryID
        },
        success: function(response){
            $('.fullPage').remove();
            getProducts();
            viewproduct(productID,"product");
            alert(response);
        }
    });
}

//

function selectBasicInfo(){
    $('.secondPage').hide();
    $('.thirdPage').hide();
    $('.firstPage').show();
}

function selectDetailedInfo(){
    $('.firstPage').hide();
    $('.thirdPage').hide();
    $('.secondPage').show();
}

function selectImages() {
    $('.firstPage').hide();
    $('.secondPage').hide();
    $('.thirdPage').show();
}
