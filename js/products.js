$.ajax({
    url: 'php/products.php',
    method: 'POST',
    data: {
        'kevin':'yes',
        'gilman':'no'
    },
    success: function(response){
        $newStatement = $('<p>'+response+'</p>');
        $('nav').after($newStatement);
    }
});