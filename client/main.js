function GETJSON(ScreenId) {
    console.log(window.location.origin + "/screen=" + ScreenId);
    return $.ajax({
        type: "GET",
        url: window.location.origin + "/post",
        data: {

        },
        success: function (response) {
            return response;
        }
    });
}

function getSchedulerFromMongo(ScreenId) {
    return $.ajax({
        type: "GET",
        url: window.location.origin + "/post1",
        data: {},
        success: function (response) {
            return response;
        }
    });
}
async function display(id) {
    json = await GETJSON(id);
    scheduler = await getSchedulerFromMongo();
    console.log(json);
    loadTemplates();
}

$(document).ready(function () {
    id = getScreen();
    display(id);
    i = 0;
});

function loadTemplates() {

    var adaptorId = (id - 1) % 3;
    var temp = scheduler[adaptorId];
    var num = i % Object.keys(temp.advertising).length;
    var post = json[temp.advertising[num]];
    console.log("Iteration: " + num);
    console.log("advertisement: " + temp.advertising[num]); {
        //$('#main_page').load(post.template, function ()
        if (Object.keys(post.texts)[0] == 'line0'||Object.keys(post.images)[0]=='img0'){
            $('#main_page').load(post.template, function () {
                $('#name').text(post.name);

                for (var j = 0; j < Object.keys(post.texts).length; j++) { // the text of the Advertising
                    $('#line' + j).text(post.texts['line' + j]);
                }

                for (var k = 0; k < Object.keys(post.images).length; k++) { // images of the Advertising
                    $('#img' + k).attr('src', post.images['img' + k]);
                }

            });
        } else {
            $('#main_page').load("../client/templates/templateB.html", function () {
                $('#name').text(post.name);
                var i = 0;
                for(i;i<post.texts.length;i++){
                    $('#line'+i).text(post.texts[i]);
                }
                // $('#line0').text(post.texts[0]);
                // $('#line1').text(post.texts[1]);
                $('#imageFrame').attr("src", post.images);
            });

        }
    }
    setTimeout(loadTemplates, temp.tempo[num]);
    i++;
}

function getScreen() {
    var url = window.location.pathname;
    var arr = url.split('=');
    return arr[1];
}