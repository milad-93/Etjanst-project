$(document).ready(function(){

    $('#BTNLoginHandlaggare').click(function() {
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
    
        if(namnFing && passFing){
            Url = 'http://localhost:50240/api/HandlaggareLogin?namn='+namn+'&pass='+pass;
            $.ajax({
                url: Url,
                type: "GET",
                contentType: 'text/plain',
                xhrFields: {
                    withCredentials: false
                },
                
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    //'Origin':'http://localhost:8080/portalHandlaggare.html',
                    //'Access-Control-Allow-Methods':'POST, GET, HEAD'
                    //'Access-Control-Request-Headers': 'origin, x-requested-with, Content-Type'
                },
                
                

                success: function(result){
                    if(result.empty){
                        console.log("result: tom.")
                    }
                    else if(result == -1){
                        $("#output-error").append("<li>" + "Användarnamnet eller lösenordet är felaktigt." + "</li>");
                    }else{
                        localStorage['handlaggare'] = result;
                        window.location.href = "handlaggare.html";
                        //console.log("result: ");
                        //console.log(result);
                    }
                },
                error: function(error){
                    $("#output-error").append("<li>ERROR: " + error + "</li>");
                }
            })
        }
    });
})