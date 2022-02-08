
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


    $('#TimingSubmit').click( async function() {
        var i = 1
        let Adv = [];
        
        var ID = $('#jsonData').val()
        console.log((ID*0) == 0);
       

        for(i;i< (AdvCount);i++){
           
            if($('#'+i+'Adv').val()){
                
            Adv[i-1] = $('#'+i+'Adv').val();
            console.log($('#'+i+'Adv').val())
            }else{
                console.log($('#'+i+'Adv').val())
                Adv[i-1] = 'Non'
            }

        }
        
        const result = await fetch('/pushScheduler',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                ID,
                Adv
            })
        }).then((res)=>res.json())
        if(result.error){
            alert(result.error);
        }else if(result.status == 'ok'){
        console.alert("succses!")
        }
    console.log(result)
      })

}

$(document).ready(function () {
    display();
    
});

function history() {
   
    var rows = "";
$.each(jsonHistory, function(){
    rows += "<tr><td > User </td><td>" + this.screen + "</td></tr>";
});

$( rows ).appendTo( "#historyUsers" );

}

function currentConnection() {
   
    var rows = "";
    $.each(jsonConnect, function(){
        rows += "<tr><td > User </td><td >" + this.screen + "</td></tr>";
    });
    
    $( rows ).appendTo( "#cueerntConnection" );
}


function editMovies() {
    var rows = "";
    $.each(jsonData, function(){
         rows += "<tr><td> "+ count + "</td><td> <input type= 'number' min='0' max='9' class='form-control' id='" + count +  "Adv' placeholder='Example input placeholder'> </td></tr>"
        console.log(rows);
        count++;
    });
    console.log(rows);
    
    $( rows ).appendTo( "#editMovies" );

}


//  $('#test').keypress(function(evt) {
//     if (evt.which == "0".charCodeAt(0) && $(this).val().trim() == "") {
//     return false;
//      }
//   });
