
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
async function display() {
    jsonHistory = await GETJSON1();
    jsonConnect = await GETJSON2();
    history();    // scheduler = getSchedule();
    currentConnection();
}

$(document).ready(function () {
    display();
    
});

function history() {
   
    var rows = "";
$.each(jsonHistory, function(){
    rows += "<br><tr><td> User </td><td>" + this.screen + "</td></tr>";
    console.log(this.screen);
});

$( rows ).appendTo( "#historyUsers" );


}
function currentConnection() {
   
    var rows = "";
    $.each(jsonConnect, function(){
        rows += "<br><tr><td> User </td><td>" + this.screen + "</td></tr>";
        console.log(this.screen);
    });
    
    $( rows ).appendTo( "#cueerntConnection" );
    

}
