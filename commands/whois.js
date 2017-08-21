var unirest = require('unirest');
var changeCase = require('change-case')
const whois = require('../tokens/whois.json');
exports.run = function(client, message, args) {
    let argscmd = message.content.split(" ").slice(1);
    let domain = argscmd[0]; // yes, start at 0, not 1. I hate that too.
    if (!domain) return message.reply("Please give me a website to look up.");
    unirest.get("https://jsonwhois.p.mashape.com/api/v1/whois?domain=" + domain)
        .header("X-Mashape-Key", whois.token)
        .header("Authorization", whois.key)
        .header("Accept", "application/json")
        .end(function(result) {
            if (result == null) return message.reply("Result Was Null")
            // For debug Only
            console.log(result.body);
            if (result.body["status"] == "available") return message.reply("That domain is not Registered.");
            console.log("Running Command for Whois | Params: Domain: " + domain);
            if (result.body["error"] == "This `tld\' has no whois server") return message.reply("That TLD has no whois server. ");
            if (result.body["status"] == "500") return message.reply("The TLD Server reported a 500 Server Error.");
            message.channel.send("Domain: " + result.body["domain"] + "\n" + "Status: " + result.body["status"] + "\n" + "Registrar: " + result.body.registrar["name"] + "\n" + "URL: " + result.body.registrar["url"]);
        });
}
