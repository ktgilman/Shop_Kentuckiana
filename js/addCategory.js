function addCatToDB(){
    var categoryName = $('#categoryName').val();
    var categoryInfo = CKEDITOR.instances.categoryInfo.getData();
    var retailerID = $('#retailer').val();
    $.ajax({
        url: 'php/addcategory.php',
        method: 'POST',
        data: {
            'categoryName':categoryName,
            'categoryInfo':categoryInfo,
            'retailerID':retailerID
        },
        success: function(response){
            $('.fullPage').remove();
            getProducts();
        }
    });
}

function addCategory(retailer) {
    $fullPageDiv = $('<div class="fullPage"></div>');
    
    $categoryDiv = $('<div class="lightBox"></div>');
    $categoryDiv.append('<h4>Add a Category</h4>');
    
    $categoryDiv.append('<label for="categoryName">Category Name</label><br><input type="text" id="categoryName"><br>');
    $categoryDiv.append('<label for="categoryInfo">Category Info</label><br><textarea id="categoryInfo"></textarea><br>');
    $categoryDiv.append('<input type="hidden" id="retailer" value="'+retailer+'">');
    $categoryDiv.append('<button id="addCatButton">Add Category</button>');
    $categoryDiv.append('<button id="closeBox" onclick="closeBox()">Close Box</button>');
    $fullPageDiv.append($categoryDiv);
    $('body').append($fullPageDiv);
    CKEDITOR.replace('categoryInfo');
    $('#addCatButton').click(addCatToDB);
}

