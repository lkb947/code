$(document).on( "pagecontainerchange", function() {
    var current = $( ".ui-page-active" ).prop("id");   
    // Remove active class from nav buttons
    $( "[data-role='navbar'] a.ui-btn-active" ).removeClass( "ui-btn-active" );
    // Add active class to current nav button
    $( "[data-role='navbar'] a" ).each(function() {
        var href = $( this ).prop("href");
        if ( href.indexOf(current, href.length - current.length) !== -1 ) {
            $( this ).addClass( "ui-btn-active" );
        }
    });
});
