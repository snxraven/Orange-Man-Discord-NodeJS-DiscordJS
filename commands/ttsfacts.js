exports.run = function(client, message, args) {
  var unirest = require('unirest');
  var changeCase = require('change-case')
  const today = require('../tokens/today.json');
  var date = new Date();
  var month = date.getMonth();
  var fix = 1;
  var monthfix = month + 1;
  var day = date.getDay();
  unirest.get("https://numbersapi.p.mashape.com/" + month + "/" + day + "/date?fragment=true&json=true")
      .header("X-Mashape-Key", today.token)
      .header("Accept", "text/plain")
      .end(function(result) {
          // For debug Only
          //console.log(result.status, result.headers, result.body);
          console.log("Running command for Today | Params: Day: " + day + " " + "Month: " + monthfix);
          var text = changeCase.upperCaseFirst(result.body["text"])
          //message.channel.send(text + "." + "\n\nDate: " + monthfix + "/" + day + "/" + result.body["year"]);
          var year = result.body["year"];

  // Delete a message
message.delete()
 .then(msg => console.log(`Deleted message from ${msg.author}`))
 .catch(console.error);

  "use strict";
  require('es6-promise').polyfill();

  var fs = require('fs');
  var path = require('path');
  var http = require('http');
  var https = require('https');
  var urlParse  = require('url').parse;
  var googleTTS = require('google-tts-api');
  var name = Math.floor(Math.random() * 999999);

  function downloadFile (url, dest) {
    return new Promise(function (resolve, reject) {
      var info = urlParse(url);
      var httpClient = info.protocol === 'https:' ? https : http;
      var options = {
        host: info.host,
        path: info.path,
        headers: {
          'user-agent': 'WHAT_EVER'
        }
      };

      httpClient.get(options, function(res) {
        // check status code
        if (res.statusCode !== 200) {
          reject(new Error('request to ' + url + ' failed, status code = ' + res.statusCode + ' (' + res.statusMessage + ')'));
          return;
        }

        var file = fs.createWriteStream(dest);
        file.on('finish', function() {
          // close() is async, call resolve after close completes.
          file.close(resolve);
        });
        file.on('error', function (err) {
          // Delete the file async. (But we don't check the result)
          fs.unlink(dest);
          reject(err);
        });

        res.pipe(file);
      })
      .on('error', function(err) {
        reject(err);
      })
      .end();
    });
  }

  // start
  googleTTS("Today in history: " + text + "in " + year)
  .then(function (url) {
    console.log(url); // https://translate.google.com/translate_tts?...

    var dest = path.resolve('./voice/', name + '.mp3'); // file destination
    console.log('Download to ' + dest + ' ...');

    return downloadFile(url, dest);
  })
  .then(function () {
    console.log('Download success');
  })
  .catch(function (err) {
    console.error(err.stack);
  });

  if (message.member.voiceChannel) {

      message.member.voiceChannel.join()
          .then(connection => { // Connection is an instance of VoiceConnection
              console.log('Playing...');
              const dispatcher = connection.playFile('./voice/' + name + ".mp3");
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
});
}
