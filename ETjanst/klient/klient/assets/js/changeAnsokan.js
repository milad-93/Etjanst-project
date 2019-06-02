$(document).ready(function(){
    //Button #ansokan-form
    $('#ansokan-form').click(function() {
        Url = 'http://localhost:50240/api/GetAllAnsokan?personnummer=' + getUrlParameter('p');
        
        //Hämta data
        $.ajax({
            url: Url,
            type: "GET",
            
            success: function(ansokan){
                console.log(ansokan[0]);
                
                handlaggareId = localStorage['handlaggare'];
                elevPersonnummer = ansokan[0].Elevpersonnummer;

                //Text
                var bedomningavhandlaggare = $('#bedomningAvHandlaggare-input').val();
                console.log(bedomningavhandlaggare);

                var i = bedomningavhandlaggare.length;
                var text = "";
                while (i--) {
                    if(bedomningavhandlaggare.charAt(i) == ' '){
                        text = text + '%';
                    }
                    else{
                        text = text + bedomningavhandlaggare.charAt(i);
                    }
                }

                inp = false;
                if ($('#statusAvHandlaggare-input').is(":checked"))
                {
                    console.log("godkänd");
                    inp = true;
                }else{
                    inp = false;
                    console.log("ej godkänd");
                }
                statusavhandlaggare = inp;

                Url = 'http://localhost:50240/api/ChangeAnsokan?handlaggareId=' + handlaggareId + '&elevPersonnummer=' + elevPersonnummer + '&bedomningAvHandlaggare=' + bedomningavhandlaggare + '&StatusAvHandlaggare=' + statusavhandlaggare;
    
                //ändra på ansökan
                $.post(Url, function(data, status){
                    console.log('save to db: ' + data);
                    if(data){
                        console.log("save to db: " + data);
                        console.log("status: " + status);
                        window.location.href = "ansokans.html";
                    }
                });
                
            },
            error: function(error){

            }
        })
    }); 
})