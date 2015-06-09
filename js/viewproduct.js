function viewproduct(itemID, itemType){
    $('#loading').show();
    $.ajax({
        url:'php/getproduct.php',
        method: 'POST',
        data: {
            'itemID':itemID,
            'itemType':itemType
        },
        dataType: 'json',
        success: function(response){
            var expand = false;
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
                    
                    $leftDiv = $('<div class="leftDiv"></div>');
                    $rightDiv = $('<div class="rightDiv"></div>');
                    $bottomDiv = $('<div class="bottomDiv"></div>');
                        
                        if (response['categoryName']) {
                            $rightDiv.append('<p>Category: '+response['categoryName']+'</p>');
                        }
                        if (response['subcategoryName']) {
                            $rightDiv.append('<p>Subcategory: '+response['subcategoryName']+'</p>');
                        }
                
                        $rightDiv.append('<p><a href="#" onclick="showHiddenBox()">Show Details</a></p>');
                        
                            $optSelect = $('<select name="optSelect" id="optSelect"></select>');
                            var productOptions = response['options'];
                            if (productOptions) {
                                for(var b=0; b<productOptions.length; b++){
                                    $optSelect.append('<option value="'+productOptions[b]['optionID']+'">'+productOptions[b]['optionName']+'</option>');
                                }
                                $viewOptionDiv = $('<div class="viewOptionDiv"></div>');
                                $viewOptionDiv.append('<p>Price: '+productOptions[0]['optionPrice']);
                                $viewOptionDiv.append('<p><a href="#" onclick="displayOptionInfo()">Display Option Info</a></p>');
                                    $viewOptionInfoWrapper = $('<div class="viewOptionInfoWrapper"></div>');
                                    $viewOptionInfoDiv = $('<div class="viewOptionInfoDiv"></div>');
                                    $viewOptionInfoDiv.append('<h3>'+productOptions[0]['optionName']+' Info</h3>');
                                    $viewOptionInfoDiv.append('<div>'+productOptions[0]['optionInfo']+'</div>');
                                    $viewOptionInfoDiv.append('<button onclick="hideViewInfoBox()">Hide Info</button>');
                                    $viewOptionInfoWrapper.append($viewOptionInfoDiv);
                                $viewOptionDiv.append($viewOptionInfoWrapper);
                                $rightDiv.append($optSelect);
                                $rightDiv.append($viewOptionDiv);
                            }else{
                                $optSelect.append('<option>No Current Pricing Options</options>');
                                $rightDiv.append($optSelect);
                                $rightDiv.append('<p>You will need to enter a pricing option in order to publish your product</p>');
                            }
                        
                        
                
                    if (response['images']) {
                        var images = response['images'];
                        if (images.length>4) {
                            expand = true;
                        }
                        $imagesDiv = $('<div class="jcarousel"></div>');
                        $imagesUL = $('<ul id="productImages"></ul>');
                        for(var a=0;a<images.length;a++){
                            var imgURL = images[a]['productImage'].substr(3);
                            $imagesUL.append('<li><img src="'+imgURL+'"></li>');
                            if (images[a]['isPrimary'] == 1) {
                                $leftDiv.append('<img src="'+imgURL+'">');
                            }
                        }
                        
                        $imagesDiv.append($imagesUL);
                        
                        $bottomDiv.append($imagesDiv);
                    }
                    
                
                $bottomDiv.append('<button id="editProduct" onclick="editProduct('+itemID+',\''+itemType+'\','+response['retailerID']+')">Edit Product</button>');
                $bottomDiv.append('<button id="deleteProduct" onclick="deleteProduct('+itemID+',\''+itemType+'\')">Delete Product</button>');
                $bottomDiv.append('<button id="closeBox" onclick="closeBox()">Close Box</button>');
                
                $hiddenInfoDiv = $('<div class="hiddenInfoDiv"></div>');
                $hiddenInfoContainer= $('<div class="hiddenContainer"></div>');
                $hiddenInfoContainer.append('<div>'+response['productInfo']+'</div>');
                $hiddenInfoContainer.append('<button id="closeHiddenBox" onclick="closeHiddenBox()">Close Box</button>');
                $hiddenInfoDiv.append($hiddenInfoContainer);
                
                $prodDiv.append($leftDiv);
                $prodDiv.append($rightDiv);
                $prodDiv.append($bottomDiv);
                $prodDiv.append($hiddenInfoDiv);
                
                $fullPageDiv.append($prodDiv);
            }
            
            
            $('body').append($fullPageDiv);
            $('#optSelect').change(changeOption);
            if (expand) {
                $('.jcarousel ul').width('1000%');
                $('.jcarousel li').width('2.3%');
                $('.jcarousel li').css('margin','.1%');
            }
            $('#loading').hide();
            
        }
    });
    

}

function changeOption() {
    $('.viewOptionDiv').remove();
    var optionID = $('#optSelect').val();
    
    $.ajax({
       url: 'php/getoptioninfo.php',
       method: 'POST',
       data:{
            'optionID': optionID
       },
       dataType: 'json',
       success: function(response){
            $viewOptionDiv = $('<div class="viewOptionDiv"></div>');
            $viewOptionDiv.append('<p>Price: '+response['optionPrice']);
            $viewOptionDiv.append('<p><a href="#" onclick="displayOptionInfo()">Display Option Info</a></p>');
                $viewOptionInfoWrapper = $('<div class="viewOptionInfoWrapper"></div>');
                $viewOptionInfoDiv = $('<div class="viewOptionInfoDiv"></div>');
                $viewOptionInfoDiv.append('<h3>'+response['optionName']+' Info</h3>');
                $viewOptionInfoDiv.append('<div>'+response['optionInfo']+'</div>');
                $viewOptionInfoDiv.append('<button onclick="hideViewInfoBox()">Hide Info</button>');
                $viewOptionInfoWrapper.append($viewOptionInfoDiv);
            $viewOptionDiv.append($viewOptionInfoWrapper);
            $('.rightDiv').append($viewOptionDiv);
       }
    });
}

function displayOptionInfo() {
    $('.viewOptionInfoWrapper').show();
    $('.bottomDiv').hide();
}

function hideViewInfoBox() {
    $('.viewOptionInfoWrapper').hide();
    $('.bottomDiv').show();
}

