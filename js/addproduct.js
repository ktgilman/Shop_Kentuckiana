//Once the user fills out the add Subcategory form, upon clicking the submit button, this function runs to add their responses to the db

function addProdToDB(e){
    e.preventDefault();
    var formData = new FormData(this);
    var productName = $('#productName').val();
    var productInfo = CKEDITOR.instances.productInfo.getData();
    var optionCount = $('#optionCount').val();
    for(var a =0; a<=optionCount; a++){
        var optionVariable = 'optionInfo'+a;
        var optionInfo = $('#'+optionVariable).val();
        alert(optionInfo);
        formData.append(optionVariable,optionInfo);
    }
    var subcategoryID = $('#subcategory').val();
    var categoryID = $('#category').val();
    var retailerID = $('#retailer').val();
    formData.append('productInfo',productInfo);
    $.ajax({
        url: 'php/addproduct.php',
        method: 'POST',
        data: formData,
        contentType: false,
        cache: false,
        processData: false,
        success: function(response){
            console.log(response);
            $('.fullPage').remove();
            getProducts();
        }
    });
}


//Display existing product info in dropdown, Hide Existing product info, and setup variables for new input
function addAnotherOption() {
    var count = $('#optionCount').val();
    var checkItems = ['optionName'+count,'optionPrice'+count,'optionInfo'+count,'containerInfo'+count];
    var tempOptionName = $('#'+checkItems[0]).val();
    var tempOptionPrice = $('#'+checkItems[1]).val();
    if (count == 0) {
        $('#reviewOptionChoices').empty();
    }
    $('#reviewOptionChoices').append('<option>'+tempOptionName+' ($'+tempOptionPrice+')</option>');
    $('#'+checkItems[0]).hide();
    $('#'+checkItems[1]).hide();
    $('#'+checkItems[3]).hide();
    count++;
    var newItems = ['optionName'+count,'optionPrice'+count,'optionInfo'+count, 'containerInfo'+count];
    $('#optionName').append('<input type="text" id="'+newItems[0]+'" name="'+newItems[0]+'">');
    $('#optionPrice').append('<input type="number" id="'+newItems[1]+'" name="'+newItems[1]+'">');
    $('#optionInfo').append('<div id="'+newItems[3]+'"><textarea id="'+newItems[2]+'" name="'+newItems[2]+'"></textarea></div>');
    $('#optionCount').val(count);
    var infoString = newItems[2];
    $('#'+infoString).ckeditor();  
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
    
        $topNav = $('<ul><li><a href="#" onclick="selectBasicInfo()">Basic Info</a></li>'+
                                '<li><a href="#" onclick="selectDetailedInfo()">Detailed Info</a></li>'+
                                '<li><a href="#" onclick="selectImages()">Select Images</a></li>'+
                                '<li><a href="#" onclick="selectOptions()">SelectOptions</a></li></ul>');
    
    $productDiv.append($topNav);
    
        $formDiv = $('<form id="uploadimage" action="" method="post" enctype="multipart/form-data"></form>');
    
        $firstPageDiv = $('<div class="firstPage"></div>');
    
        $firstPageDiv.append('<label for="productName">Product Name</label><br><input type="text" name="productName" id="productName"><br>');
        $firstPageDiv.append('<label for="category">Assigned Category</label><br><select name="categoryID" id="category"></select><br>');
        $firstPageDiv.append('<label for="subcategory">Assigned Subcategory</label><br><select name="subcategoryID" id="subcategory"><option value="0">No Subcategory</option></select><br>');
    
    $formDiv.append($firstPageDiv);
    
        $secondPageDiv = $('<div class="secondPage"></div>');
        $secondPageDiv.append('<label for="productInfo">Product Info</label><br><textarea name="productInfo" id="productInfo"></textarea><br>');
        
    $formDiv.append($secondPageDiv);
    
        $thirdPageDiv = $('<div class="thirdPage"></div>');
        
        $thirdPageDiv.append('<label id="imageUploadLabel">Select Image: <input type="file" count="0" name="fileToUpload0" id="fileToUpload0"></label>');
        $thirdPageDiv.append('<div class="preview"><ul></ul></div>');
    
    $formDiv.append($thirdPageDiv);
    
        $fourthPageDiv = $('<div class="fourthPage"></div>');
    
            $optionChoiceDiv = $('<div class="optionChoice"></div>');
            $optionSelectList = $('<select id="reviewOptionChoices"></select>');
            $optionSelectList.append('<option>Add Pricing Option</option>');
            $optionChoiceDiv.append($optionSelectList);
        
        $fourthPageDiv.append($optionChoiceDiv);
        
            $addOptionDiv = $('<div class="addOption"></div>');
            $addOptionDiv.append('<input type="hidden" id = "optionCount" name="optionCount" value="0">');
            $addOptionDiv.append('<label id="optionName">Option Name: <input type="text" id="optionName0" name="optionName0"></label><br>');
            $addOptionDiv.append('<label id="optionPrice">Option Price: <input type="number" id="optionPrice0" name="optionPrice0"></label><br>');
            $addOptionDiv.append('<label id="optionInfo">Option Info: <div id="containerInfo0"><textarea id="optionInfo0" name="optionInfo0"></textarea></div></label><br>');
            $addOptionDiv.append('<a href="#" onclick="addAnotherOption()">Add Another Option</a><br>');
            
        $fourthPageDiv.append($addOptionDiv);
    
    $formDiv.append($fourthPageDiv);
    
    $formDiv.append('<input type="hidden" id="retailer" name="retailerID" value="'+retailer+'">');
    $formDiv.append('<input type="submit" value="Add Product" id="addProdButton">');
    $productDiv.append($formDiv);
    $productDiv.append('<button id="closeBox" onclick="closeBox()">Close Box</button>');
    $fullPageDiv.append($productDiv);
    $('body').append($fullPageDiv);
    $('#productInfo').ckeditor();
    $('#optionInfo0').ckeditor();
    $('#uploadimage').submit(addProdToDB);
    $('#category').change(getSubCatsFromCat);
    $('.secondPage').hide();
    $('.thirdPage').hide();
    $('.fourthPage').hide();
    
    $('#fileToUpload0').change(getImagePreview);
    
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