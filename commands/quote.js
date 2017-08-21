var unirest = require('unirest');
const quote = require('../tokens/quote.json');
exports.run = function(client, message, args) {

    unirest.post("https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=1")
        .header("X-Mashape-Key", quote.token)
        .header("Content-Type", "application/x-www-form-urlencoded")
        .header("Accept", "application/json")
        .end(function(result) {
            // For debug Only
            // console.log(result.status, result.headers, result.body);
            console.log("Running Command for Quote");
            var data = JSON.parse(result.body);
            var quote = data["quote"];
            var author = data["author"];
            message.channel.send(quote + "\n-" + author);
        });
}
