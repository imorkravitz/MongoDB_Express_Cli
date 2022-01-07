$(document).ready(function () {
    i = 0;
    json = getJson();
    scheduler = getSchedule();
    loadTemplates();
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