exports.run = function(client, message, args) {
    let argscmd = message.content.split(" ").slice(1);
    let urlcmd = argscmd[0];

    if (!urlcmd) return message.reply("Please give me a MP3 URL");


    var fs = require('fs');

    var nrc = require('node-run-cmd');

    var download = require('download-file')

    var url = urlcmd
    if (url != "stop") {
        var name = Math.floor(Math.random() * 999999);
        var callback = function(exitCodes) {
            console.log('Called Back - Playing....');


            if (message.member.voiceChannel) {

                message.member.voiceChannel.join()
                    .then(connection => { // Connection is an instance of VoiceConnection
                        console.log('Playing...');
                        const dispatcher = connection.playFile('./songs/' + name + ".mp3");
                        dispatcher.on("end", end => {
                            message.member.voiceChannel.leave();
                        });

                        dispatcher.on('error', e => {
                            // Catch any errors that may arise
                            return message.reply(e);

                        });

                    })

                    .catch(console.log);


            } else {
                message.reply('You need to join a voice channel first!');
            }

        };
        message.reply('Please wait, Playing your file...');
        nrc.run('wget ' + url + ' -O ./songs/' + name + '.mp3', {
            onDone: callback
        });

        console.log('wget ' + url + ' -O ./songs/' + name + '.mp3');
    }

    if (url == "stop") {
        message.reply('I have stopped...');
        console.log('Stopping...');
        message.member.voiceChannel.leave();


    }


}
