//global
var isUsername = true;
var isPersonnummer = true;
//ser så att input är inte tom.
function isEmpty(string) {
    if(string == ""){
        return true;
    }
    else{
        return false;
    }
}
//gen text för input error.
function genTextError(string){
    return '<div id="error-' + string + '" class="error alert alert-danger" role="alert">Du måste fylla i fältet.</div>'
}
//skapar en låda för error till rätt input.
function addErrorBox(inputBox){
    $('#error-' + inputBox + '').remove();
    $('#' + inputBox).after(genTextError(inputBox));
}
/*
function isUsernameInUse(username){
    Url = 'http://localhost:50240/api/VardnadshavareGet?username=' + username;
    $.ajax({
        url: Url,
        type: "POST",
        contentType: 'text/plain',

        success: function(result){
            isUsername = result;
            console.log('result: ' + result);
        },
        error: function(error){
        }
    })
}

function isPersonnummerInUse(personnummer){
    Url = 'http://localhost:50240/api/VardnadshavareGet?personnummer=' + personnummer;
    $.ajax({
        url: Url,
        type: "POST",
        contentType: 'text/plain',

        success: function(result){
            isUsername = result;
        },
        error: function(error){
        }
    })
}
*/

$(document).ready(function(){
    $('#BTNSkapa').click(function() {
        $('.error').remove();

        var username = $('#namn-input').val();
        var fornamn = $('#fornamn-input').val();
        var efternamn = $('#efternamn-input').val();
        var andranamn = $('#andranamn-input').val();
        var personnummer = $('#personnummer-input').val();
        var password = $('#password-input').val();
        var passwordIgen = $('#passwordIgen-input').val();

        var isTransmissible = true;

        //kollar om det är toma
        if(isEmpty(username)){
            addErrorBox('namn-input');
            isTransmissible = false;
        }
        else{
            $('#error-namn-input').remove();
            Url = 'http://localhost:50240/api/VardnadshavareGet?username=' + username;
            $.ajax({
                url: Url,
                type: "POST",
                contentType: 'text/plain',

                success: function(result){
                    if(result){
                        var tempText = '<div id="error-namn-input" class="error alert alert-danger" role="alert">användarnamnet är redan upptaget.</div>';
        
                        $('#namn-input').after(tempText);
                        isTransmissible = false;
                    }
                },
                error: function(error){
                }
            })
        }    

        if(isEmpty(fornamn)){
            addErrorBox('fornamn-input');
            isTransmissible = false;
        }
        if(isEmpty(efternamn)){
            addErrorBox('efternamn-input');
            isTransmissible = false;
        }
        if(isEmpty(personnummer)){
            addErrorBox('personnummer-input');
            isTransmissible = false;
        }
        else{
            $('#error-personnummer-input').remove();
            Url = 'http://localhost:50240/api/VardnadshavareGet?personnummer=' + personnummer;
            $.ajax({
                url: Url,
                type: "POST",
                contentType: 'text/plain',

                success: function(result){
                    if(result){
                        var tempText = '<div id="error-personnummer-input" class="error alert alert-danger" role="alert">Personnummer är redan upptaget.</div>';
        
                        $('#personnummer-input').after(tempText);
                        isTransmissible = false;
                    }
                },
                error: function(error){
                }
            })
        }

        if(isEmpty(password)){
            addErrorBox('password-input');
            isTransmissible = false;
        }
        if(isEmpty(passwordIgen)){
            addErrorBox('passwordIgen-input');
            isTransmissible = false;
        }

        //Får vara tom
        if(isEmpty(andranamn)){
            andranamn = null;
        }

        //är lösen samma?
        if(!(password == passwordIgen)){
            var tempText = '<div id="error-password-input" class="error alert alert-danger" role="alert">Lösenorden är inte samma.</div>';

            $('#error-password-input').remove();
            $('#password-input').after(tempText);
            isTransmissible = false;
        }

        if(isTransmissible){
            data = {
                "Vardnadshavarepersonnummer": personnummer,
                "Fornamn": fornamn,
                "Efternamn": efternamn,
                "Anvandarnamn": username,
                "Losenord": password,
                "Andranamn": andranamn 
            };


            const url = 'http://localhost:50240/api/AddVardnadshavare';
            $.post(
                url, 
                data, 
                function(data, status){
                    if(data){
                        window.location.href = "vardnadshavare.html";
                    }
                }
            );
        }

    });
})