function closeBox(event){
    if (event) {
        event.preventDefault();
    }
    
    $('.fullPage').remove();
}

function showPageOptions(){
    $('#yourpage').show();
}

function hidePageOptions(){
    $('#yourpage').hide();
}

$('#retailerPage').hover(showPageOptions,hidePageOptions);
