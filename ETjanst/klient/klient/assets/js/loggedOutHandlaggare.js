$(document).ready(function(){
    var yetVisited = localStorage['handlaggare'];
    if (yetVisited) {
        window.location.href = "handlaggare.html";
    }
})