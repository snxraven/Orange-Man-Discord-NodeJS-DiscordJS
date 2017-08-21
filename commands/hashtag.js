var unirest = require('unirest');
var changeCase = require('change-case')
const hashtag = require('../tokens/hashtag.json');

exports.run = function(client, message, args) {
    let argscmd = message.content.split(" ").slice(1);
    let hash = argscmd[0]; // yes, start at 0, not 1. I hate that too.
    if (!hash) return message.reply("Please give me a hashtag to look up.");
    unirest.get("https://tagdef.p.mashape.com/one." + hash + ".json")
        .header("X-Mashape-Key", hashtag.token)
        .header("Accept", "application/json")
        .end(function(result) {
            // For Debug Only
            //console.log(result.status, result.headers, result.body);
            console.log("Running Command for Hashtag | Params: Hashtag: " + hash);
            if (!result.body.defs.def["text"]) return message.reply("That hashtag does not exist.");
            message.channel.send("Hashtag: " + hash + ": " + result.body.defs.def["text"] + "\n" + "Upvotes: " + result.body.defs.def["upvotes"] + " Downvotes: " + result.body.defs.def["downvotes"]);
        });
}
