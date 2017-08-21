var unirest = require('unirest');
const ping = require('../tokens/ping.json');
exports.run = function(client, message, args) {

    let argscmd = message.content.split(" ").slice(1);
    let word = argscmd[0]; // yes, start at 0, not 1. I hate that too.
    if (!word) return message.reply("Please give me server to ping.");

    unirest.get("https://igor-zachetly-ping-uin.p.mashape.com/pinguin.php?address=" + word)
        .header("X-Mashape-Key", "BFxx1cBP7ymshYMgSMgvWWtxEVl6p1jFK9pjsnSYAD1D9OUbQ7")
        .header("Accept", "application/json")
        .end(function(result) {
            //console.log(result.status, result.headers, result.body);
            if (!result.body["time"]) return message.reply("Server did not respond");
            console.log("Running Command for ping | Params: " + word);
            message.channel.send("Ping Successful: " + "http://" + word + "\nResonse Time: " + result.body["time"]);
        });
}
