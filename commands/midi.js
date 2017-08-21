exports.run = function(client, message, args) {
    let argscmd = message.content.split(" ").slice(1);
    let urlcmd = argscmd[0];

    if (!urlcmd) return message.reply("Please give me a MIDI URL or command");


    var fs = require('fs');
    const synth = require('synth-js');
    var nrc = require('node-run-cmd');

    var download = require('download-file')

    var url = urlcmd
    if (url != "stop") {
        var name = Math.floor(Math.random() * 999999);
        var callback = function(exitCodes) {
            console.log('Called Back - Converting....');

            let midiBuffer = fs.readFileSync('./midifiles/' + name + ".mid");
            // convert midi buffer to wav buffer
            let wavBuffer = synth.midiToWav(midiBuffer).toBuffer();

            fs.writeFileSync('./midifiles/' + name + ".wav", wavBuffer, {
                encoding: 'binary'
            });
            if (message.member.voiceChannel) {

                message.member.voiceChannel.join()
                    .then(connection => { // Connection is an instance of VoiceConnection
                        console.log('Playing...');
                        const dispatcher = connection.playFile('./midifiles/' + name + ".wav");
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
        message.reply('Please wait, Converting your file...');
        nrc.run('wget ' + url + ' -O ./midifiles/' + name + '.mid', {
            onDone: callback
        });

        console.log('wget ' + url + ' -O ./midifiles/' + name + '.mid');
    }

    if (url == "stop") {
        message.reply('I have stopped...');
        console.log('Stopping...');
        message.member.voiceChannel.leave();


    }


}
