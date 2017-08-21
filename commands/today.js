var unirest = require('unirest');
var changeCase = require('change-case')
const today = require('../tokens/today.json');
exports.run = function(client, message, args) {

    var date = new Date();
    var month = date.getMonth();
    var fix = 1;
    var monthfix = month + 1;
    var day = date.getDay();
    unirest.get("https://numbersapi.p.mashape.com/" + month + "/" + day + "/date?fragment=true&json=true")
        .header("X-Mashape-Key", today.token)
        .header("Accept", "text/plain")
        .end(function(result) {
            // For debug Only
            //console.log(result.status, result.headers, result.body);
            console.log("Running command for Today | Params: Day: " + day + " " + "Month: " + monthfix);
            var text = changeCase.upperCaseFirst(result.body["text"])
            message.channel.send(text + "." + "\n\nDate: " + monthfix + "/" + day + "/" + result.body["year"]);
        });


}
