
function GETJSON(ScreenId) {
    console.log(window.location.origin + "/screen=" + ScreenId);
    return $.ajax({
        type: "GET",
        url: window.location.origin + "/post",
        data: {
            ScreenId: ScreenId
        },
        success: function (response) {
            return response;
        }
    });
}

async function display(id) {
    try{
        json = await GETJSON(id);
        console.log(json);
        scheduler = getSchedule();
        await loadTemplates();
    }catch(e){
        console.log(e);
    }
}

$(document).ready(function () {
    id = getScreen();
    display(id);
    i = 0;

});


function loadTemplates() {
    id = getScreen();
    if (i == 0) {
        console.log("screen id: " + id);
    }
    var temp = scheduler[id - 1];
    var num = i % Object.keys(temp.advertising).length;
    var post = json[temp.advertising[num]];
    console.log("Iteration: " + num);
    console.log("advertisement: " + temp.advertising[num]); {
        $('#main_page').load(post.template, function () {
            $('#name').text(post.name);

            for (var j = 0; j < Object.keys(post.texts).length; j++) { // the text of the Advertising
                $('#line' + j).text(post.texts['line' + j]);
            }

            for (var k = 0; k < Object.keys(post.images).length; k++) { // images of the Advertising
                $('#img' + k).attr('src', post.images['img' + k]);
            }
        });
    }
    setTimeout(loadTemplates, temp.tempo[num]);
    i++;
}

function getScreen() {
    var url = window.location.pathname;
    var arr = url.split('=');
    return arr[1];
}