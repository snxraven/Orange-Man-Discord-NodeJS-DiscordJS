var unirest = require('unirest');
var changeCase = require('change-case')
const facts = require('../tokens/facts.json');
exports.run = function(client, message, args) {

    let argscmd = message.content.split(" ").slice(1);
    let month = argscmd[0]; // yes, start at 0, not 1. I hate that too.
    let day = argscmd[1];
    if (!month) return message.reply("Please give me month\nExample:\n!facts 5 1");
    if (!day) return message.reply("Please give me day\nExample:\n!facts 5 1");
    unirest.get("https://numbersapi.p.mashape.com/" + month + "/" + day + "/date?fragment=true&json=true")
        .header("X-Mashape-Key", facts.token)
        .header("Accept", "text/plain")
        .end(function(result) {
            // For debug Only
            //console.log(result.status, result.headers, result.body);
            console.log("Running command for Facts | Params: Day: " + day + " " + "Month: " + month);
            var text = changeCase.upperCaseFirst(result.body["text"])
            message.channel.send(text + "." + "\n\nDate: " + month + "/" + day + "/" + result.body["year"]);
        });
}
