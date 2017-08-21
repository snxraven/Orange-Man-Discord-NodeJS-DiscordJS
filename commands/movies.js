var unirest = require('unirest');
const movies = require('../tokens/movies.json');
exports.run = function(client, message, args) {

    unirest.post("https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies&count=1")
        .header("X-Mashape-Key", movies.token)
        .header("Content-Type", "application/x-www-form-urlencoded")
        .header("Accept", "application/json")
        .end(function(result) {
            // For debug Only
            // console.log(result.status, result.headers, result.body);
            console.log("Running Command for Movies");
            var data = JSON.parse(result.body);
            var quote = data["quote"];
            var author = data["author"];

            message.channel.send(quote + "\n-" + author);
        });
}
