//Kör btn
$(document).ready(function(){
    $('input:button').click(function() {
        console.log($(this).val());
        alert($(this).val());
    });
})