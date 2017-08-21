var unirest = require('unirest');
exports.run = function(client, message, args) {

    let argscmd = message.content.split(" ").slice(1);
    let word = argscmd.slice(0).join(" ");
    if (!word) return message.reply("Please give me a search word.");



    unirest.post("http://grwh.ga/api/index.php?term=" + word)
        .header("Accept", "application/json")
        .end(function(result) {
            // For debug Only
            //  console.log(result.status, result.headers, result.body);
            console.log("Running Command for Google Images | Params: " + word);
            if (!result.body.value["response"]) return message.reply("There was nothing found!");
             message.reply("Grabbing your Photo...");

            message.channel.send(" ", {
              file: result.body.value["response"] // Or replace with FileOptions object
          });
        });
}
