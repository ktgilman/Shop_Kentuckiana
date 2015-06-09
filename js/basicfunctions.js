function closeBox(event){
    if (event) {
        event.preventDefault();
    }
    
    $('.fullPage').remove();
}

function showHiddenBox(event){
    if (event) {
        event.preventDefault();
    }
    $('.hiddenInfoDiv').show();
}

function closeHiddenBox(event){
    if (event) {
        event.preventDefault();
    }
    $('.hiddenInfoDiv').hide();
}

function showPageOptions(){
    $('#yourpage').show();
}

function hidePageOptions(){
    $('#yourpage').hide();
}

$('#retailerPage').hover(showPageOptions,hidePageOptions);
