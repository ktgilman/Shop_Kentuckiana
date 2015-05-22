//Once the user fills out the add Subcategory form, upon clicking the submit button, this function runs to add their responses to the db

function addProdToDB(){
    var productName = $('#productName').val();
    var productInfo = CKEDITOR.instances.productInfo.getData();
    var subcategoryID = $('#subcategory').val();
    var categoryID = $('#category').val();
    var retailerID = $('#retailer').val();
    $.ajax({
        url: 'php/addproduct.php',
        method: 'POST',
        data: {
            'productName':productName,
            'productInfo':productInfo,
            'subcategoryID':subcategoryID,
            'categoryID':categoryID,
            'retailerID':retailerID
        },
        success: function(response){
            console.log(response);
            $('.fullPage').remove();
            getProducts();
        }
    });
}

//When the user selects a category, the subcategory select element should populate with the available subcategories in that category

function getSubCatsFromCat(){
    categoryID = $('#category').val();
    $('#subcategory option').remove();
    $.ajax({
        url: 'php/getsubcategoryarray.php',
        method: 'POST',
        data:{
            'categoryID':categoryID
        },
        dataType: 'json',
        success: function(response){
            $('#subcategory').append('<option value="0">No Subcategory</option>');
            if (response) {
               for(var b=0;b<response.length;b++){
                $('#subcategory').append('<option value="'+response[b]['subcategoryID']+'">'+response[b]['subcategoryName']+'</option>');
                } 
            }
            
        }
    });
    
}

//When the user clicks the Add Subcategory Button, this function will run and create a lightbox with the input for adding a Subcategory to the database.

function addProduct(retailer) {
    
    //put together the form
    $fullPageDiv = $('<div class="fullPage"></div>');
    
    $productDiv = $('<div class="lightBox"></div>');
    $productDiv.append('<h4>Add a Product</h4>');
    
    $productDiv.append('<label for="productName">Product Name</label><br><input type="text" id="productName"><br>');
    $productDiv.append('<label for="category">Assigned Category</label><br><select name="category" id="category"></select><br>');
    $productDiv.append('<label for="subcategory">Assigned Subcategory</label><br><select name="subcategory" id="subcategory"><option value="0">No Subcategory</option></select><br>');
    $productDiv.append('<label for="productInfo">Product Info</label><br><textarea id="productInfo"></textarea><br>');
    $productDiv.append('<input type="hidden" id="retailer" value="'+retailer+'">');
    $productDiv.append('<button id="addProdButton">Add Product</button>');
    $productDiv.append('<button id="closeBox" onclick="closeBox()">Close Box</button>');
    $fullPageDiv.append($productDiv);
    $('body').append($fullPageDiv);
    CKEDITOR.replace('productInfo');
    $('#addProdButton').click(addProdToDB);
    $('#category').change(getSubCatsFromCat);
    
    //need to get array of categories because each Subcategory must have a category that it falls under
    
    $.ajax({
        url:'php/getcategoryarray.php',
        method: 'POST',
        data:{
            'retailerID':retailer
        },
        dataType: 'json',
        success: function(response){
            $('#category').append('<option value="0">No Category</option>');
            if (response) {
                for(var a=0;a<response.length;a++){
                $('#category').append('<option value="'+response[a]['categoryID']+'">'+response[a]['categoryName']+'</option>');
                }
            }
        }
    });
}