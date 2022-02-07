
var count =1;
function getAdvCount(){
    return count
}
async function display() {
    jsonHistory = await GETJSON1();
    jsonConnect = await GETJSON2();
    jsonData = await GETJSON3();
    history();    // scheduler = getSchedule();
    currentConnection();
    editMovies();
    AdvCount = getAdvCount()


    $('#TimingSubmit').click(function() {
        var i = 1
        let Adv = [];
        var temp;
        console.log($('#jsonData').val());
        for(i;i< (AdvCount);i++){
            if($('#'+i+'Adv').val()){
            Adv[i-1] = $('#'+i+'Adv').val();
            console.log($('#'+i+'Adv').val())
            }else{
                console.log($('#'+i+'Adv').val())
                Adv[i-1] = 'Non'
            }
        }
        
       
      })

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
   //var count = 1;
    var rows = "";
   // $('jsonData').placeholder.location('testing');
    $.each(jsonData, function(){
         rows += "<tr><td> "+ count + "</td><td> <input type= 'text' class='form-control' id='" + count +  "Adv' placeholder='Example input placeholder'> </td></tr>"
        //rows += "<tr><td> User </td><td>" + this.screen + "</td></tr>";
        console.log(rows);
        count++;
    });
    console.log(rows);
    
    $( rows ).appendTo( "#editMovies" );


}


