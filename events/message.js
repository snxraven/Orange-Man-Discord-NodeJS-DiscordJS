const settings = require('../settings.json');
module.exports = message => {
	if (!message.content.startsWith(settings.prefix)) return;
  if (message.author.bot) return;
  if (message.channel.id == settings.spam){

	const client = message.client;
	const args = message.content.split(' ');
	const command = args.shift().slice(settings.prefix.length);


	try {
		let cmdFile = require(`../commands/${command}`);
		cmdFile.run(client, message, args);
	} catch (err) {
		console.log(`Command ${command} failed\n${err.stack}`);
	}
};

}