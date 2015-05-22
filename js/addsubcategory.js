//Once the user fills out the add Subcategory form, upon clicking the submit button, this function runs to add their responses to the db

function addSubCatToDB(){
    var subcategoryName = $('#subcategoryName').val();
    var subcategoryInfo = CKEDITOR.instances.subcategoryInfo.getData();
    var categoryID = $('#category').val();
    $.ajax({
        url: 'php/addsubcategory.php',
        method: 'POST',
        data: {
            'subcategoryName':subcategoryName,
            'subcategoryInfo':subcategoryInfo,
            'categoryID':categoryID
        },
        success: function(response){
            console.log(response);
            $('.fullPage').remove();
            getProducts();
        }
    });
}

//When the user clicks the Add Subcategory Button, this function will run and create a lightbox with the input for adding a Subcategory to the database.

function addSubCategory(retailer) {
    
    //put together the form
    $fullPageDiv = $('<div class="fullPage"></div>');
    
    $subcategoryDiv = $('<div class="lightBox"></div>');
    $subcategoryDiv.append('<h4>Add a Subcategory</h4>');
    
    $subcategoryDiv.append('<label for="subcategoryName">Subcategory Name</label><br><input type="text" id="subcategoryName"><br>');
    $subcategoryDiv.append('<label for="category">Assigned Category</label><br><select name="category" id="category"></select><br>');
    $subcategoryDiv.append('<label for="subcategoryInfo">Subcategory Info</label><br><textarea id="subcategoryInfo"></textarea><br>');
    $subcategoryDiv.append('<button id="addSubCatButton">Add Subcategory</button>');
    $subcategoryDiv.append('<button id="closeBox" onclick="closeBox()">Close Box</button>');
    $fullPageDiv.append($subcategoryDiv);
    $('body').append($fullPageDiv);
    CKEDITOR.replace('subcategoryInfo');
    $('#addSubCatButton').click(addSubCatToDB);
    
    //need to get array of categories because each Subcategory must have a category that it falls under
    
    $.ajax({
        url:'php/getcategoryarray.php',
        method: 'POST',
        data:{
            'retailerID':retailer
        },
        dataType: 'json',
        success: function(response){
            for(var a=0;a<response.length;a++){
                $('#category').append('<option value="'+response[a]['categoryID']+'">'+response[a]['categoryName']+'</option>');
            }
        }
    });
    
    
    
}