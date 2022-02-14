
var count = 1;
function getAdvCount() {
    return count
}
//===========================Muin function=========================================
async function display() {
    jsonHistory = await GETJSON1();
    jsonConnect = await GETJSON2();
    jsonData = await GETJSON3();
    history();    // scheduler = getSchedule();
    currentConnection();
    editMovies();
    AdvCount = getAdvCount()
    editAdv()

//===========================EditScheduler=========================================
    $('#TimingSubmit').click(async function () {
        var i = 1
        let Adv = [];

        var ID = $('#jsonData').val()
        for (i; i < (AdvCount); i++) {

            if ($('#' + i + 'Adv').val()) {

                Adv[i - 1] = $('#' + i + 'Adv').val();
                console.log($('#' + i + 'Adv').val())
            } else {
                console.log($('#' + i + 'Adv').val())
                Adv[i - 1] = 'Non'
            }
        }

        const result = await fetch('/pushScheduler', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ID,
                Adv
            })
        }).then((res) => res.json())
        if (result.error) {
            alert(result.error);
        } else if (result.status == 'ok') {
            alert("succses!")
        }
        console.log(result)
    })
//===========================InsertAdv===========================================
    const form = document.getElementById("insert");
    form.addEventListener('submit', insert)
    async function insert(event) {

        event.preventDefault()
        const name = document.getElementById('name').value
        const texts = document.getElementById('texts').value
        const images = document.getElementById('images').value
        const result = await fetch('/insert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                texts,
                images
            })
        }).then((res) => res.json())
        if (result.error) {
            alert(result.error);
        } else if (result.status == 'ok') {
            alert('An advertisement was placed on the site');
        }
    }
//===========================UpdateAdv=========================================

    $('#upDate').click(async function () {
        
        var Id = $('#idUpDate').val();
        var Title = $('#titleUpDate').val();
        var Text = $('#textUpData').val();
        var Image = $('#imageUpDate').val();

        const result = await fetch('/upDateAdv', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               Id,
               Title,
               Text,
               Image
            })
        }).then((res) => res.json())
        if (result.error) {
            alert(result.error);
        } else if (result.status == 'ok') {
            alert("succses!")
        }
        console.log(result)
    })
//===========================deleteAdv=========================================

    $('#deleteAdv').click(async function () {


        var id = $('#inupAdv').val()
        console.log(id)
        const result = await fetch('/deleteAdvById', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id
            })
        }).then((res) => res.json())
        if (result.status == 'error') {
            alert(result.error);
        } else if (result.status == 'ok') {
            alert("succses!\n 'The Adv (" + id + ") deleted ")
        }
        console.log(result)
    })

}

$(document).ready(function () {
    display();

});

function history() {

    var rows = "";
    $.each(jsonHistory, function () {
        rows += "<tr><td > User </td><td>" + this.screen + "</td></tr>";
    });
    $(rows).appendTo("#historyUsers");
}

function currentConnection() {

    var rows = "";
    $.each(jsonConnect, function () {
        rows += "<tr><td > User </td><td >" + this.screen + "</td></tr>";
    });

    $(rows).appendTo("#cueerntConnection");
}


function editMovies() {
    var rows = "";
    $.each(jsonData, function () {
        rows += "<tr><td> " + count + "</td><td> <input type= 'number' min='0' max='9' class='form-control' id='" + count + "Adv' placeholder='Enter Time in Miliseconds'> </td></tr>"
        count++;
    });
    $(rows).appendTo("#editMovies");
}

function editAdv() {

    var rows = "";
    var i = 0;
    $.each(jsonData, function () {

        rows += "<article class='item'>"

        rows += "<div><b><u></u>ID:</u></b></div>"
        rows += "<p>" + jsonData[i]._id + "</p>"
        rows += "<div><b><u></u>title:</u></b></div>"
        rows += "<p>" + jsonData[i].name + "</p>"
        rows += "<div><b><u></u>Text:</u></b></div>"
        rows += "<p>" + JSON.stringify(jsonData[i].texts) + "</p>"
        rows += "<div><b><u></u>Image:</u></b></div>"
        // rows += "<p>"+ jsonData[i].images +"</p>"
        rows += "</article>"
        i++;
    })
    $(rows).appendTo("#items");
}