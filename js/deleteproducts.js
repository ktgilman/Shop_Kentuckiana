function deleteProduct(productID, deleteType){
    var checkDelete;
    if (deleteType=="product") {
        checkDelete = confirm("Are you sure you wish to delete product?");
    }else if (deleteType=="subcategory") {
        checkDelete = confirm("Are you sure you wish to delete subcategory?");
    }else if (deleteType=="category") {
        checkDelete = confirm("Are you sure you wish to delete category and all it's subcategories?");
    }
    if (checkDelete) {
        $.ajax({
            url: 'php/deleteproduct.php',
            method: 'POST',
            data: {
                'deleteType':deleteType,
                'itemID':productID
            },
            success: function(response){
                if ($('.fullPage')) {
                    $('.fullPage').remove();
                }
                getProducts();
            }
        });
    }
    
}