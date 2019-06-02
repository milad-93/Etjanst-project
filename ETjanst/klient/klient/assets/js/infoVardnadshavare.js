function jsUcfirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

$(document).ready(function(){

    $('.loggaUt').click(function() {
        localStorage.clear();
        location.reload();
    });

    Url = 'http://localhost:50240/api/VardnadshavareGet?personnummer=' + localStorage['vardnadshavare'];
    
    $.ajax({
        url: Url,
        type: "GET",
        
        success: function(result){
            $("#loggerHead").text("Logga ut som " + jsUcfirst(result[0].Fornamn) + " " + jsUcfirst(result[0].Efternamn) + "");
            $("#loggerBody").text("Välkommen vardnadshavare " + jsUcfirst(result[0].Fornamn) + " ");
            
        },
        error: function(error){
            $("#output-error").append("<li>ERROR: " + error + "</li>");
        }
    })
})