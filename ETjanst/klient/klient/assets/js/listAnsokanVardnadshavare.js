function personnummer(string) 
{
    var b = "-";
    var position = 8;
    var output = [string.slice(0, position), b, string.slice(position)].join('');
    return output;
}
function datum(string) 
{
    var b = " Tid: ";
    var position = 11;
    var output = "Datum: " + [string.slice(0, position - 1), b, string.slice(position)].join('');
    return output;
}
function beslut(bool) 
{
    if(bool){
        return "Godkänd";
    }else{
        return "Ej godkänd";
    }
}

$(document).ready(function(){
    const Url = 'http://localhost:50240/api/GetAllAnsokan?vardnadshavarepersonnummer=' + localStorage['vardnadshavare'] + "";

    $.ajax({
        url: Url,
        type: "GET",
            
        success: function(result){
            $.each(result, function(i, item) {
                var s = i + 1;
                var personnummerLink = '<a type="button" href="ansokanVardnadshavare.html?p='+ result[i].Elevpersonnummer +'" class="btn btn-gbg-primary btn-flat" >' + personnummer(result[i].Elevpersonnummer) + '</a>';

                if(result[i].Fardig){
                    var scope = "";
                    if(result[i].StatusAvHandlaggare){
                        scope = 'class="table-success"';
                    }else{
                        scope = 'class="table-danger"';
                    }
                    var bodyFil = '<tr ' + scope + ' >/n<th scope="row">'+ s +'</th>/n<td>'+ personnummerLink +'</td>/n<td>'+ datum(result[i].DatumAvVardnadshavare) +'</td>/n<td>'+ datum(result[i].DatumAvHandlaggare) +'</td>/n<td>'+ beslut(result[i].StatusAvHandlaggare) +'</td></tr>/n';
                    $("#tbody-good").append(bodyFil);
                }else{
                    var bodyFil = '<tr>/n<th scope="row">'+ s +'</th>/n<td>'+ personnummerLink +'</td>/n<td>'+ datum(result[i].DatumAvVardnadshavare) +'</td>/n</tr>/n';
                    $("#tbody-ej").append(bodyFil);
                }
            });
        },
        error: function(error){
            console.log("Error: " + error);
        }
    })
})