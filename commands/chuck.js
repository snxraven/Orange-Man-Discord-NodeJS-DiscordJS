var unirest = require('unirest');
exports.run = function(client, message, args) {

    unirest.get("http://api.icndb.com/jokes/random?firstName=Chuck&amp;lastName=Norris")
        .header("Accept", "application/json")
        .end(function(result) {
            // For Debug Only
            //console.log(result.status, result.headers, result.body);
            console.log("Running Command for Chuck Norris");
            message.channel.send(result.body.value["joke"]);
        });



}
