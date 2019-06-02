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

$(document).ready(function(){
    const Url = 'http://localhost:50240/api/GetAllAnsokan?status=false';

    $.ajax({
        url: Url,
        type: "GET",
            
        success: function(result){
            $.each(result, function(i, item) {
                var s = i + 1;
                var personnummerLink = '<a type="button" href="ansokan.html?p='+ result[i].Elevpersonnummer +'" class="btn btn-gbg-primary btn-flat" >' + personnummer(result[i].Elevpersonnummer) + '</a>';
                $("tbody").append('<tr>/n<th scope="row">'+ s +'</th>/n<td>'+ personnummerLink +'</td>/n<td>'+ datum(result[i].DatumAvVardnadshavare) +'</td>/n</tr>/n');
            });
        },
        error: function(error){
            console.log("Error: " + error);
        }
    })
})