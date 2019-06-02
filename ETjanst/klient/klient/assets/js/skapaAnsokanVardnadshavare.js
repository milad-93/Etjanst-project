
$(document).ready(function(){
    //Hämta bass info till ansökan
    Url = 'http://localhost:50240/api/VardnadshavareGet?personnummer=' + localStorage['vardnadshavare'];
    $.ajax({
        url: Url,
        type: "GET",
        
        success: function(result){
            $("#vardnadshavarepersonnummer-input").val(result[0].Vardnadshavarepersonnummer);
            $("#vardnadshavareettnamn-input").val(result[0].Fornamn + " " + result[0].Efternamn);
        },
        error: function(error){
            console.log(error);
        }
    })

    //Gör en array för alla input i formen.
    var noMoreError = false;
    $('#skapa-form').click(function() {
        console.log("start form");
        const allInputs = [
            "vardnadshavareettnamn-input",
            "vardnadshavarepersonnummer-input",
            "vardnadshavareettpostort-input",
            "vardnadshavareettepost-input",
            "vardnadshavareettpostnummer-input",
            "vardnadshavareettadress-input",
            "vardnadshavareetttelefon-input",
            "vardnadshavaretwopostort-input",
            "vardnadshavaretwoepost-input",
            "vardnadshavaretwopostnummer-input",
            "vardnadshavareTwoAdress-input",
            "vardnadshavaretwotelefon-input",
            "vardnadshavaretwonamn-input",
            "elevpersonnummer-input",
            "elevfornamn-input",
            "elevefternamn-input",
            "elevpostadress-input",
            "elevpostnummer-input",
            "elevfolkbokforingsadress-input",
            "skola-input",
            "skolpostadress-input",
            "skolpostnummer-input",
            "skoladress-input",
            "skolarskurs-input",
            "motiveraansokan-input",
            "sarkildaomstandigheter-input",
            "funktionsvariation-input",
            "vaxelvisboende-input",
            "trafikfarligskolvag-input",
            "avstandfranskola-input",
            "period-input",
            "fritidshem-input",
            "vinterskolskjuts-input",
            "skolfritidshem-input"
        ];
        var arrOutput = new Array();
        var arrErrorOutput = new Array();
        var dontSend = false;

        //loppar array
        allInputs.forEach(item => {
            //Om input är tom.
            if($("#" + item).val() == ""){
                if(("vinterskolskjuts-input" == item) || ("skolfritidshem-input" == item)){
                    /*
                    $("#error-" + item).remove();
                    $("#" + item).parent().after('<div id="error-' + item + '" class="alert alert-danger" role="alert">Du måste fylla i fältet.</div>');
                    */
                }
                else{
                    $("#error-" + item).remove();
                    $("#" + item).after('<div id="error-' + item + '" class="alert alert-danger" role="alert">Du måste fylla i fältet.</div>');
                    arrErrorOutput.push(true);
                    dontSend = true;
                }
            }
            //Om svart är okej.
            else{
                $("#error-" + item).remove();
                arrErrorOutput.push(false);
            }

            //om det är boxs.
            if("vinterskolskjuts-input" == item || "skolfritidshem-input" == item){
                inp = false;
                if ($('#' + item).is(":checked"))
                {
                    inp = true;
                }else{
                    inp = false;
                }
                //spara box
                arrOutput.push(inp);
            }else{
                //spara normla
                arrOutput.push($("#" + item).val());
            }
        });

        anUrl = 'http://localhost:50240/api/GetAllAnsokan?personnummer=' + arrOutput[13];
    
        $.ajax({
            url: anUrl,
            type: "GET",
            success: function(result){
                //tar bort error om det finns.
                $("#error").remove();
                //ser om ansökan redan finns med id.
                if(result.length == 0){
                    $("#skapa-form").after('<div id="error" class="alert alert-success" role="alert">Ansökan har blivit sänd.</div>');
                }
                else{
                    dontSend = true;
                    $("#skapa-form").after('<div id="error" class="alert alert-danger" role="alert">Ansökan till barn finns redan.</div>');
                }
            },
            error: function(error){
                $("#skapa-form").after('<div id="error" class="alert alert-danger" role="alert">Går inte att nå server...</div>');
            }
        })

        if(dontSend)
        {
            $("header").scroll();
        }
        else
        {
            //json mall för ansökan
            input ={
                "$id":null,
                "Elevpersonnummer" : "" + arrOutput[13] + "",
                "ElevFornamn":"" + arrOutput[14] + "",
                "ElevEfternamn":"" + arrOutput[15] + "",
                "Skola":"" + arrOutput[19] + "",
                "SkolArskurs":"" + arrOutput[23] + "",
                "ElevFolkbokforingsadress":"" + arrOutput[18] + "",
                "ElevPostnummer":"" + arrOutput[17] + "",
                "ElevPostadress":"" + arrOutput[16] + "",
                "Fritidshem":"" + arrOutput[31] + "",
                "Skoladress":"" + arrOutput[22] + "",
                "SkolFritidshem":"" + arrOutput[33] + "",
                "SkolPostnummer":"" + arrOutput[21] + "",
                "SkolPostadress":"" + arrOutput[20] + "",
                "VardnadshavareEttNamn":"" + arrOutput[0] + "",
                "VardnadshavareEttTelefon":"" + arrOutput[6] + "",
                "VardnadshavareEttAdress":"" + arrOutput[5] + "",
                "VardnadshavareEttPostnummer":"" + arrOutput[4] + "",
                "VardnadshavareEttEpost":"" + arrOutput[3] + "",
                "VardnadshavareEttPostort":"" + arrOutput[2] + "",
                "VardnadshavareTwoNamn":"" + arrOutput[12] + "",
                "VardnadshavareTwoTelefon":"" + arrOutput[11] + "",
                "VardnadshavareTwoAdress":"" + arrOutput[10] + "",
                "VardnadshavareTwoPostnummer":"" + arrOutput[9] + "",
                "VardnadshavareTwoEpost":"" + arrOutput[8] + "",
                "VardnadshavareTwoPostort":"" + arrOutput[7] + "",
                "Period":"" + arrOutput[30] + "",
                "VinterSkolskjuts":"" + arrOutput[32] + "",
                "AvstandFranSkola":"" + arrOutput[29] + "",
                "TrafikfarligSkolvag":"" + arrOutput[28] + "",
                "VaxelVisboende":"" + arrOutput[27] + "",
                "FunktionsVariation":"" + arrOutput[26] + "",
                "SarkildaOmstandigheter":"" + arrOutput[25] + "",
                "MotiveraAnsokan":"" + arrOutput[24] + "",
                "Vardnadshavarepersonnummer":"" + arrOutput[1] + "",
                "IdHandlaggare":null,
                "DatumAvHandlaggare":null,
                "DatumAvVardnadshavare":null,
                "BedomningAvHandlaggare":null,
                "StatusAvHandlaggare":null,
                "Fardig":false
            };

            urlPost = 'http://localhost:50240/api/AddAnsokan';

            //sänd ansökan till servic
            $.post(urlPost, input, function(data, status){
                console.log('save to db: ' + data);
                if(data){
                    window.location.href = "vardnadshavare.html";
                }
            });
              
        }
    });
})
