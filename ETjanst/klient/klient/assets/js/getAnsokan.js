var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

function personnummer(string) {
    var b = "-";
    var position = 8;
    var output = [string.slice(0, position), b, string.slice(position)].join('');
    return output;
}

function gruppform(namn, input, index){
    index = index.toLowerCase();
    var output = '<div class="form-group"><label for="'+ index +'-input">'+namn+':</label><input value="' +input+ '" type="text"class="form-control" name="'+ index +'-input" id="'+ index +'-input" aria-describedby="help-'+ index +'-input" disabled></div>';
    return output;
}
function gruppformval(namn, input, index){
    index = index.toLowerCase();
    var output = '<div class="form-group"><label for="'+ index +'-input">'+namn+':</label><input value="' +input+ '" type="text"class="form-control" name="'+ index +'-input" id="'+ index +'-input" aria-describedby="help-'+ index +'-input"></div>';
    return output;
}
$(document).ready(function(){
    
    
    
    
    Url = 'http://localhost:50240/api/GetAllAnsokan?personnummer=' + getUrlParameter('p');
    
    $.ajax({
        url: Url,
        type: "GET",
        

        success: function(result){
            $("#loggerTitle").text("Ansökan: " + personnummer(result[0].Elevpersonnummer));
            $("#loggerLast").text("Ansökan: " + personnummer(result[0].Elevpersonnummer));
            $("#loggerForm").text("Info om ansökan: " + personnummer(result[0].Elevpersonnummer));
            
            //Elevpersonnummer
            $("#ansokanEdit").prepend(gruppform('Elev personnummer', result[0].Elevpersonnummer, 'Elevpersonnummer'));
            //ElevFornamn
            $("#ansokanEdit").prepend(gruppform('Elev Förnamn', result[0].ElevFornamn, 'ElevFornamn'));
            //ElevEfternamn
            $("#ansokanEdit").prepend(gruppform('Elev Efternamn', result[0].ElevEfternamn, 'ElevEfternamn'));
            //Skola
            $("#ansokanEdit").prepend(gruppform('Vilken Skola', result[0].Skola, 'Skola'));
            //SkolArskurs
            $("#ansokanEdit").prepend(gruppform('Skola årskurs', result[0].SkolArskurs, 'SkolArskurs'));
            //ElevFolkbokforingsadress
            $("#ansokanEdit").prepend(gruppform('Elev folkbokforingsadress', result[0].ElevFolkbokforingsadress, 'ElevFolkbokforingsadress'));
            //ElevPostnummer
            $("#ansokanEdit").prepend(gruppform('Elev Postnummer', result[0].ElevPostnummer, 'ElevPostnummer'));
            //ElevPostadress
            $("#ansokanEdit").prepend(gruppform('Elev Postadress', result[0].ElevPostadress, 'ElevPostadress'));
            //Fritidshem
            $("#ansokanEdit").prepend(gruppform('Fritidshem', result[0].Fritidshem, 'Fritidshem'));
            //Skoladress
            $("#ansokanEdit").prepend(gruppform('Skoladress', result[0].Skoladress, 'Skoladress'));
            //SkolFritidshem
            $("#ansokanEdit").prepend(gruppform('Skola Fritidshem', result[0].SkolFritidshem, 'SkolFritidshem'));
            //SkolPostnummer
            $("#ansokanEdit").prepend(gruppform('Skola Postnummer', result[0].SkolPostnummer, 'SkolPostnummer'));
            //SkolPostadress
            $("#ansokanEdit").prepend(gruppform('Skol Postadress', result[0].SkolPostadress, 'SkolPostadress'));
            //Vardnadshavarepersonnummer
            $("#ansokanEdit").prepend(gruppform('Första vardnadshavarens personnummer', result[0].Vardnadshavarepersonnummer, 'Vardnadshavarepersonnummer'));
            //VardnadshavareEttNamn
            $("#ansokanEdit").prepend(gruppform('Första vardnadshavarens namn', result[0].VardnadshavareEttNamn, 'VardnadshavareEttNamn'));
            //VardnadshavareEttTelefon
            $("#ansokanEdit").prepend(gruppform('Första vardnadshavarens telefon', result[0].VardnadshavareEttTelefon, 'VardnadshavareEttTelefon'));
            //VardnadshavareEttAdress
            $("#ansokanEdit").prepend(gruppform('Första vardnadshavarens adress', result[0].VardnadshavareEttAdress, 'VardnadshavareEttAdress'));
            //VardnadshavareEttPostnummer
            $("#ansokanEdit").prepend(gruppform('Första vardnadshavarens postnummer', result[0].VardnadshavareEttPostnummer, 'VardnadshavareEttPostnummer'));
            //VardnadshavareEttEpost
            $("#ansokanEdit").prepend(gruppform('Första vardnadshavarens e-mail', result[0].VardnadshavareEttEpost, 'VardnadshavareEttEpost'));
            //VardnadshavareEttPostort
            $("#ansokanEdit").prepend(gruppform('Första vardnadshavarens Postort', result[0].VardnadshavareEttPostort, 'VardnadshavareEttPostort'));
            //VardnadshavareTwoNamn
            $("#ansokanEdit").prepend(gruppform('Andra vardnadshavarens namn', result[0].VardnadshavareTwoNamn, 'VardnadshavareTwoNamn'));
            //VardnadshavareTwoTelefon
            $("#ansokanEdit").prepend(gruppform('Andra vardnadshavarens telefon', result[0].VardnadshavareTwoTelefon, 'VardnadshavareTwoTelefon'));
            //VardnadshavareTwoAdress
            $("#ansokanEdit").prepend(gruppform('Andra vardnadshavarens adress', result[0].VardnadshavareTwoAdress, 'ElevpersoVardnadshavareTwoAdressnnummer'));
            //VardnadshavareTwoPostnummer
            $("#ansokanEdit").prepend(gruppform('Andra vardnadshavarens postnummer', result[0].VardnadshavareTwoPostnummer, 'VardnadshavareTwoPostnummer'));
            //VardnadshavareTwoEpost
            $("#ansokanEdit").prepend(gruppform('Andra vardnadshavarens e-mail', result[0].VardnadshavareTwoEpost, 'VardnadshavareTwoEpost'));
            //VardnadshavareTwoPostort
            $("#ansokanEdit").prepend(gruppform('Andra vardnadshavarens postort', result[0].VardnadshavareTwoPostort, 'VardnadshavareTwoPostort'));
            //Period
            $("#ansokanEdit").prepend(gruppform('Period', result[0].Period, 'Period'));
            //VinterSkolskjuts
            $("#ansokanEdit").prepend(gruppform('Vinter skolskjuts:', result[0].VinterSkolskjuts, 'VinterSkolskjuts'));
            //AvstandFranSkola
            $("#ansokanEdit").prepend(gruppform('Avstand från skola', result[0].AvstandFranSkola, 'AvstandFranSkola'));
            //TrafikfarligSkolvag
            $("#ansokanEdit").prepend(gruppform('Trafikfarlig Skolväg', result[0].TrafikfarligSkolvag, 'TrafikfarligSkolvag'));
            //VaxelVisboende
            $("#ansokanEdit").prepend(gruppform('Vaxel visboende', result[0].VaxelVisboende, 'VaxelVisboende'));
            //FunktionsVariation
            $("#ansokanEdit").prepend(gruppform('Funktions variation / funktionsnedsättning', result[0].FunktionsVariation, 'FunktionsVariation'));
            //SarkildaOmstandigheter
            $("#ansokanEdit").prepend(gruppform('Sarkilda omstandigheter', result[0].SarkildaOmstandigheter, 'SarkildaOmstandigheter'));
            //MotiveraAnsokan
            $("#ansokanEdit").prepend(gruppform('Motivering', result[0].MotiveraAnsokan, 'MotiveraAnsokan'));
            
            //DatumAvVardnadshavare
            $("#ansokanEdit").prepend(gruppform('Datum satt av vardnadshavare', result[0].DatumAvVardnadshavare, 'DatumAvVardnadshavare'));
            /*
            //BedomningAvHandlaggare result[0].BedomningAvHandlaggare
            $("#ansokanEdit").before(gruppformval('Bedömning av handlaggare', "", 'BedomningAvHandlaggare'));

            //StatusAvHandlaggare result[0].StatusAvHandlaggare
            $("#ansokanEdit").before(gruppformval('Status av handlaggare', "", 'StatusAvHandlaggare'));
            */

            //Fardig
            //$("#ansokanEdit").append(gruppform('Färdig', result[0].Fardig, 'Fardig'));
            //IdHandlaggare
            //$("#ansokanEdit").append(gruppform('IdHandlaggare', result[0].IdHandlaggare, 'IdHandlaggare'));
            //DatumAvHandlaggare
            //$("#ansokanEdit").append(gruppform('Datum satt av handlaggare', result[0].DatumAvHandlaggare, 'DatumAvHandlaggare'));
            
        },
        error: function(error){
            //$("#output-error").append("<li>ERROR: " + error + "</li>");
        }
    })
    
})