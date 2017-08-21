exports.run = function(client, message, args) {

    let argscmd = message.content.split(" ").slice(1);
    let word = argscmd.slice(0).join(" "); // yes, start at 0, not 1. I hate that too.
    if (!word) return message.reply("Please give me a word to look up.");
    var urban = require('urban'),
        dict = urban(word);
    dict.first(function(json) {
        //co.nsole.log(json.definition);
        // For debug Only
        // console.log(result.status, result.headers, result.body);
        console.log("Running Command for Urban | Params: " + word);
        if (!json) return message.reply("That word does not exist");
        message.channel.send(json.word + ": " + json.definition + "\n\nExample:\n" + json.example);
    });
}
