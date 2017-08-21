exports.run = function(client, message, args) {

    var fs = require('fs');
    var Midi = require('jsmidgen');
    const synth = require('synth-js');
    let argscmd = message.content.split(" ").slice(1);
    let first = argscmd[0];
    if (!first) return message.reply("Please give me a note.");

    var file = new Midi.File();
    var track = new Midi.Track();
    file.addTrack(track);


    // yes, start at 0, not 1. I hate that too.
    for (var i in argscmd) {

        console.log(argscmd[i]);
        var hh = argscmd[i];
        if (hh == "1") {
            hh = "c1";
        } else {
            if (hh == "2") {
                hh = "d1";
            }
            if (hh == "3") {
                hh = "e1";
            }
            if (hh == "4") {
                hh = "f1";
            }
            if (hh == "5") {
                hh = "g1";
            }

            if (hh == "6") {
                hh = "a1";
            }

            if (hh == "7") {
                hh = "b1";
            }

            if (hh == "7") {
                hh = "c2";
            }
        }
        track.addNote(0, hh, 64);
    }

    fs.writeFileSync('./midifiles/test.mid', file.toBytes(), 'binary');

    let midiBuffer = fs.readFileSync('./midifiles/test.mid');
    // convert midi buffer to wav buffer
    let wavBuffer = synth.midiToWav(midiBuffer).toBuffer();

    fs.writeFileSync('./midifiles/song.wav', wavBuffer, {
        encoding: 'binary'
    });

    if (message.member.voiceChannel) {
        message.member.voiceChannel.join()
            .then(connection => { // Connection is an instance of VoiceConnection

                const dispatcher = connection.playFile('./midifiles/song.wav');
            })
            .catch(console.log);
    } else {
        message.reply('You need to join a voice channel first!');
    }




}
