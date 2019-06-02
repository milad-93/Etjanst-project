$(document).ready(function(){

    $('#BTNLoginVardnadshavare').click(function() {
        var namn = $('#namn-input').val();
        var pass = $('#password-input').val();
        var namnFing = true;
        var passFing = true;
        
        $("#output-error").empty();
        if(namn == ""){
            $("#output-error").append("<li>Användarnamn kan inte vara tom.</li>");
            namnFing = false;
        }
        if(pass == ""){
            $("#output-error").append("<li>Lösenord kan inte vara tom.</li>");
            var passFing = false;
        }
    
        //
        if(namnFing && passFing){
            Url = 'http://localhost:50240/api/VardnadshavareLogin?namn=' + namn + '&pass=' + pass;
            $.ajax({
                url: Url,
                type: "GET",
                contentType: 'text/plain',
                xhrFields: {
                    withCredentials: false
                },
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                
                success: function(result){
                    if(result == "-1"){
                        $("#output-error").append("<li>" + "Användarnamnet eller lösenordet är felaktigt." + "</li>");
                    }else{
                        localStorage['vardnadshavare'] = result;
                        window.location.href = "vardnadshavare.html";
                    }
                },
                error: function(error){
                    $("#output-error").append("<li>ERROR: " + error + "</li>");
                }
            })
        }
    });
})