
function GETJSON1() {
    return $.ajax({
        type: "GET",
        url: window.location.origin + "/historyUsers",
        data: {
        
        },
        success: function (response) {
            
            console.log(response)
            return response;
        }
    });
}
function GETJSON2() {
    return $.ajax({
        type: "GET",
        url: window.location.origin + "/currentConnected",
        data: {
        
        },
        success: function (response) {
            
            console.log(response)
            return response;
        }
    });
}
function GETJSON3() {
    return $.ajax({
        type: "GET",
        url: window.location.origin + "/editScheduler",
        data: {
        
        },
        success: function (response) {
            
            console.log(response)
            return response;
        }
    });
}
async function display() {
    jsonHistory = await GETJSON1();
    jsonConnect = await GETJSON2();
    jsonData = await GETJSON3();
    history();    // scheduler = getSchedule();
    currentConnection();
    editMovies();
}

$(document).ready(function () {
    display();
    
});

function history() {
   
    var rows = "";
$.each(jsonHistory, function(){
    rows += "<tr><td > User </td><td>" + this.screen + "</td></tr>";
    //console.log(this.screen);
});

$( rows ).appendTo( "#historyUsers" );


}

function currentConnection() {
   
    var rows = "";
    $.each(jsonConnect, function(){
        rows += "<tr><td > User </td><td >" + this.screen + "</td></tr>";
        //console.log(this.screen);
    });
    
    $( rows ).appendTo( "#cueerntConnection" );
}


function editMovies() {
   var count = 1;
    var rows = "";
   // $('jsonData').placeholder.location('testing');
    $.each(jsonData, function(){
         rows += "<tr><td> "+ count + "</td><td> <input type= 'text' class='form-control' id='formGroupExampleInput' placeholder='Example input placeholder'> </td></tr>"
        //rows += "<tr><td> User </td><td>" + this.screen + "</td></tr>";
        console.log(this.screen+"@@@@@@@@");
        count++;
    });
    
    
    $( rows ).appendTo( "#editMovies" );
}
