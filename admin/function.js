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
function GETJSON4() {
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
