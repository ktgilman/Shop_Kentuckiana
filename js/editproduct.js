function editProduct(itemID, itemType, retailerID){
    $('#loading').show();
    $('.fullPage').remove();
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
            console.log(response);
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
                $('#loading').hide();
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
                $('#loading').hide();
                CKEDITOR.replace('subcategoryInfo');
                $('#updateSubCatButton').click(updateSubCatToDB);
            }else if (itemType == 'product') {
                var expand = false;
                $productDiv = $('<div class="lightBox"></div>');
                $productDiv.append('<h4>Edit a Product</h4>');
                    
                    $topNav = $('<ul><li><a href="#" onclick="selectBasicInfo()">Basic Info</a></li>'+
                                '<li><a href="#" onclick="selectDetailedInfo()">Detailed Info</a></li>'+
                                '<li><a href="#" onclick="selectImages()">Select Images</a></li>'+
                                '<li><a href="#" onclick="selectOptions()">SelectOptions</a></li></ul>');
                    
                $productDiv.append($topNav);
                
                $formDiv = $('<form id="uploadimage" action="" method="post" enctype="multipart/form-data"></form>');
                
                    $firstPageDiv = $('<div class="firstPage"></div>');
                    $firstPageDiv.append('<label for="productName">Product Name</label><br><input type="text" name="productName" id="productName" value="'+response['productName']+'"><br>');
                    $firstPageDiv.append('<input type="hidden" name="productID" id="productID" value="'+response['productID']+'">');
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
                $formDiv.append($firstPageDiv);
                
                    $secondPageDiv = $('<div class="secondPage"></div>');
                    $secondPageDiv.append('<br><label for="productInfo">Product Info</label><br><textarea name="productInfo" id="productInfo">'+response['productInfo']+'</textarea><br>');
                    $secondPageDiv.append('<input type="hidden" id="retailer" value="'+retailerID+'">');
                
                $formDiv.append($secondPageDiv);
                
                    $thirdPageDiv = $('<div class="thirdPage"></div>');
                        
                        var $imageArray = response['images'];
                        if ($imageArray) {
                            $primaryImageDiv = $('<div class="showPrimaryImage"></div>');
                            $primaryImageDiv.append('<p>Primary Image</p>');
                            $productImagesDiv = $('<div class="jcarousel" id="productImages"></div>');
                            $productImagesUL = $('<ul></ul');
                            for(var d=0;d<$imageArray.length;d++){
                                var imageURL = $imageArray[d]['productImage'].substr(3);
                                var imageID = $imageArray[d]['productImageID'];
                                $productImagesUL.append('<li id="'+imageID+'"><img src="'+imageURL+'"><a href="#" onclick="makePrimary(\''+imageID+'\',\''+imageURL+'\')">Make Primary</a><br>'+
                                                        '<a href="#" onclick="deleteImage(\''+imageID+'\',\''+$imageArray.length+'\')">Delete Image</a></li>');
                                if ($imageArray[d]['isPrimary'] == 1) {
                                    $primaryImageDiv.append('<img id="primaryImage" imgID="'+imageID+'" src="'+imageURL+'">');
                                }
                            
                            }
                            $thirdPageDiv.append($primaryImageDiv);
                            $productImagesDiv.append($productImagesUL);
                            $thirdPageDiv.append($productImagesDiv);
                            if ($imageArray.length>4) {
                                expand = true;
                            }
                        }
                        
                    var count = 0;
                    var idWithCount = "fileToUpload"+count;
                    $thirdPageDiv.append('<label id="imageUploadLabel">Upload Product Image<input type="file" count = "0" name="'+idWithCount+'" id="'+idWithCount+'"></label><br>');
                    $thirdPageDiv.append('<div class="preview"><ul></ul></div>');
                
                $formDiv.append($thirdPageDiv);
                
                    $fourthPageDiv = $('<div class="fourthPage"></div>');
                    $fourthPageDiv.append('<label for="seeOptions">See Options</label>');
                    
                        $selectOptions = $('<select name="seeOptions" id="seeOptions"></select>');
                        var productOptions = response['options'];
                        if (productOptions) {
                            for (var e=0;e<productOptions.length;e++) {
                                var optionName = productOptions[e]['optionName'];
                                var optionID = productOptions[e]['optionID'];
                                var optionPrice = productOptions[e]['optionPrice'];
                                $selectOptions.append('<option value="'+optionID+'">'+optionName+' ($'+optionPrice+')</option>');
                            }
                            $fourthPageDiv.append($selectOptions);
                            $fourthPageDiv.append('<a href="#" onclick="editOption()">EditOption</a>');
                            $fourthPageDiv.append('<a href="#" onclick="deleteOption()">Delete Option</a>');
                        }else{
                            $selectOptions.append('<option value="">No current options</option>');
                            $fourthPageDiv.append($selectOptions);
                            $fourthPageDiv.append('<p>You\'ll need to select an option in order to publish your product</p>');
                        }
                        
                        $addOptionDiv = $('<div class="addOption"></div>');
                        $addOptionDiv.append('<h4>Add Option</h4>');
                        $addOptionDiv.append('<label for="optionName">Option Name</label><input type="text" id="optionName" name="optionName"><br>');
                        $addOptionDiv.append('<label for="optionPrice">Option Price</label><input type="number" id="optionPrice" name="optionPrice"><br>');
                        $addOptionDiv.append('<a href="#" onclick="showOptionInfo()">Edit Option Information</a><br>');
                            $optionInfoDiv=$('<div id="optionInfoDiv"></div>');
                            $optionInfoDiv.append('<h3>Option Info</h3>');
                            $optionInfoDiv.append('<textarea name="optionInfo" id="optionInfo"></textarea><br>');
                            $optionInfoDiv.append('<a href="#" onclick="hideOptionInfo()">Hide Info</a>');
                            
                        $addOptionDiv.append($optionInfoDiv);
                        
                        $addOptionDiv.append('<a href="#" onclick="uploadOption(\''+itemID+'\')">Upload Option Only</a>');
                        
                        $fourthPageDiv.append($addOptionDiv);
                        
                    
                $formDiv.append($fourthPageDiv);
                
                $formDiv.append('<input type="submit" value="Upload" class="submit">');
                $productDiv.append($formDiv);
                $productDiv.append('<button id="closeBox" onclick="closeBox()">Close Box</button>');
                $fullPageDiv.append($productDiv);
                $('body').append($fullPageDiv);
                $('.secondPage').hide();
                $('.thirdPage').hide();
                $('.fourthPage').hide();
                $('#loading').hide();
                CKEDITOR.replace('productInfo');
                CKEDITOR.replace('optionInfo');
                $('#uploadimage').submit(updateProdToDB);
                $('#category').change(getSubCatsFromCat);
                $('#'+idWithCount).change(getImagePreview);
                if (expand) {
                    $('.jcarousel ul').width('1000%');
                    $('.jcarousel li').width('2.3%');
                    $('.jcarousel li').css('margin','.1%');
                }
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

function updateProdToDB(e) {
    e.preventDefault();
    var productID = $('#productID').val();
    var productInfo = CKEDITOR.instances.productInfo.getData();
    var optionInfo = CKEDITOR.instances.optionInfo.getData();
    var formData = new FormData(this);
    formData.append('productInfo',productInfo);
    formData.append('optionInfo',optionInfo);
    $.ajax({
        url: "php/updateproduct.php", // Url to which the request is send
        type: "POST",             // Type of request to be send, called as method
        data: formData, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
        contentType: false,       // The content type used when sending data to the server.
        cache: false,             // To unable request pages to be cached
        processData:false,        // To send DOMDocument or non processed data file it is set to false
        success: function(data)   // A function to be called if request succeeds
            {
            $('.fullPage').remove();
            getProducts();
            viewproduct(productID,"product");
            alert(data);
            }
    });
}

function getImagePreview() {
    var file = this.files[0];
    var imagefile = file.type;
    var match= ["image/jpeg","image/png","image/jpg"];
    if(!((imagefile==match[0]) || (imagefile==match[1]) || (imagefile==match[2]))){
        alert("<p id='error'>Please Select A valid Image File</p>"+"<h4>Note</h4>"+"<span id='error_message'>Only jpeg, jpg and png Images type allowed</span>");
        var $existing = $('#imageUploadLabel').children().last();
        $existing.val("");
    }else{
        var reader = new FileReader();
        reader.onload = imageIsLoaded;
        reader.readAsDataURL(this.files[0]);
    }
    
}

function imageIsLoaded(e) {
    var $existing = $('#imageUploadLabel').children().last();
    var count = $existing.attr('count');
    var previewWithCount = "preview"+count;
    $('.preview ul').append('<li id="'+previewWithCount+'"><img src="'+e.target.result+'"><a href="#" onclick="deleteFromUpload(\''+count+'\')">Delete</a></li>');
    if (count>3) {
        $('.preview ul').width('1000%');
        $('.preview li').width('2.3%');
        $('.preview li').css('margin','.1%');
    }
    count++;
    var idWithCount = "fileToUpload"+count;
    $('#imageUploadLabel').append('<input type="file" count="'+count+'" name="'+idWithCount+'" id="'+idWithCount+'">');
    $('#'+idWithCount).change(getImagePreview);
    $existing.attr('hidden', true);
}

function makePrimary(image, URL){
    $.ajax({
        url:'php/editimagefunctions.php',
        method: 'POST',
        data: {
            'imageID':image,
            'editType':'makePrimary'
        },
        success: function(response){
            if (response == "0") {
                $('.showPrimaryImage').append('<img id="primaryImage" imgID="'+image+'" src="'+URL+'">')
            }else{
                $('#primaryImage').attr('src',URL);
                $('#primaryImage').attr('imgID',image);
            }
            
        }
    });
}

function deleteImage(image, length){
    $.ajax({
        url:'php/editimagefunctions.php',
        method: 'POST',
        data: {
            'imageID':image,
            'editType':'delete'
        },
        success: function(response){
            $('#'+image).remove();
            
            if (length<=5) {
                $('.jcarousel ul').width('100%');
                $('.jcarousel li').width('23%');
                $('.jcarousel li').css('margin','1%');
            }
            
        //If deleting and image from db, need to also remove image from current view.
            var primaryID = $('#primaryImage').attr("imgID");
            if (primaryID == image) {
                $('#primaryImage').remove();
            }
        }
    });
}

function deleteFromUpload(deleteID){
    $('#preview'+deleteID).remove();
    $('#fileToUpload'+deleteID).remove();
    
}
function selectBasicInfo(){
    $('.secondPage').hide();
    $('.thirdPage').hide();
    $('.firstPage').show();
    $('.fourthPage').hide();
}

function selectDetailedInfo(){
    $('.firstPage').hide();
    $('.thirdPage').hide();
    $('.secondPage').show();
    $('.fourthPage').hide();
}

function selectImages() {
    $('.firstPage').hide();
    $('.secondPage').hide();
    $('.thirdPage').show();
    $('.fourthPage').hide();
}

function selectOptions(){
    $('.firstPage').hide();
    $('.secondPage').hide();
    $('.thirdPage').hide();
    $('.fourthPage').show();
}

function showOptionInfo(){
    $('#optionInfoDiv').show();
}

function hideOptionInfo(){
    $('#optionInfoDiv').hide();
}

function editOption() {
    var optionID = $('#seeOptions').val();
    $.ajax({
        url: 'php/getoptioninfo.php',
        method: 'POST',
        data: {
            'optionID': optionID
        },
        dataType: 'json',
        success: function(response){
            console.log(response);
            var $optionEditDiv = $('<div id="optionEditDiv"></div>');
            $optionEditDiv.append('<h3>Edit Option</h3>');
            $optionEditDiv.append('<label for="optionEditName">Option Name</label><input type="text" name="optionEditName" id="optionEditName" value="'+response['optionName']+'"><br>');
            $optionEditDiv.append('<label for="optionEditPrice">Option Price</label><input type="number" name="optionEditPrice" id="optionEditPrice" value="'+response['optionPrice']+'"><br>');
            $optionEditDiv.append('<label for="optionEditInfo">Option Info</label><textarea id="optionEditInfo" name="optionEditInfo">'+response['optionInfo']+'</textarea><br>');
            $optionEditDiv.append('<button onclick="updateOption(\''+response['optionID']+'\')">Update Option</button>');
            $optionEditDiv.append('<button onclick="closeOptionEdit()">Close</button>');
            $('body').append($optionEditDiv);
            CKEDITOR.replace('optionEditInfo');
        }
    });
    
}

function closeOptionEdit() {
    $('#optionEditDiv').remove();
}

function uploadOption(productID) {
    var optionName = $('#optionName').val();
    var optionPrice = $('#optionPrice').val();
    var optionInfo = CKEDITOR.instances.optionInfo.getData();
    $.ajax({
        url: 'php/updateoption.php',
        method: 'POST',
        data: {
            'type':'add',
            'optionName':optionName,
            'optionPrice':optionPrice,
            'optionInfo':optionInfo,
            'productID':productID
        },
        success: function(response){
            if (!$('#seeOptions').val()) {
                $('#seeOptions').empty();
                $('#seeOptions').after('<a href="#" onclick="editOption()">EditOption</a>');
                $('#seeOptions').next().after('<a href="#" onclick="deleteOption()">Delete Option</a>');
            }
                
            $('#seeOptions').append('<option value="'+response+'" selected>'+optionName+' ($'+optionPrice+')</option>');
            $('#optionName').val("");
            $('#optionPrice').val("");
            CKEDITOR.instances.optionInfo.setData("");
        }
        
    });
}

function updateOption(optionID){
    var optionName = $('#optionEditName').val();
    var optionPrice = $('#optionEditPrice').val();
    var optionInfo = CKEDITOR.instances.optionEditInfo.getData();
    $.ajax({
       url: 'php/updateoption.php',
       method: 'POST',
       data:{
            'type':'edit',
            'optionID':optionID,
            'optionName':optionName,
            'optionPrice':optionPrice,
            'optionInfo':optionInfo
       },
       success: function(response){
            alert(response);
            $('#seeOptions option:selected').empty();
            $('#seeOptions option:selected').append(optionName+' ($'+optionPrice+')');
            $('#optionEditDiv').remove();
       }
    });
}
