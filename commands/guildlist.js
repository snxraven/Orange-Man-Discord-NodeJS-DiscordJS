exports.run = function(client, message, args) {

    console.log(client.guilds.map(g => g.name).join("\n"))
}
