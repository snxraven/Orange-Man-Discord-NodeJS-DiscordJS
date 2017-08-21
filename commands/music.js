exports.run = function(client, message, args) {
  var Anesidora = require("anesidora");
  var pandora = new Anesidora("USERNAME", "PASSWORD");
  var nrc = require('node-run-cmd');
  var name = Math.floor(Math.random() * 999999);
  let argscmd = message.content.split(" ").slice(1);
  let word = argscmd.slice(0).join(" ");
  if (word != "stop") {
  var callback = function(exitCodes) {
      console.log('finished...playing');

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
}
  pandora.login(function(err) {
      if (err) throw err;
      pandora.request("user.getStationList", function(err, stationList) {
          if (err) throw err;
          var station = stationList.stations[0];
          pandora.request("station.getPlaylist", {
              "stationToken": station.stationToken,
              "additionalAudioUrl": "HTTP_128_MP3"
          }, function(err, playlist) {
              if (err) throw err;
              var track = playlist.items[0];
              console.log("Playing '" + track.songName + "' by " + track.artistName);
              message.channel.send("Playing '" + track.songName + "' by " + track.artistName);
              console.log(track.additionalAudioUrl);
            var playthis = track.additionalAudioUrl;
            nrc.run('wget ' + playthis + ' -O ./songs/' + name + '.mp3', {
                onDone: callback
            });
          console.log('wget ' + playthis + ' -O ./songs/' + name + '.mp3');
          });
      });
  });

  if (word == "next") {
      message.reply('Next song...');
      console.log('Stopping...');
      message.member.voiceChannel.leave();


  }

} else {
message.reply('Goodbye');
message.member.voiceChannel.leave();
}

}
