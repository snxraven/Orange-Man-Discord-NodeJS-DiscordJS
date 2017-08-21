exports.run = function(client, message, args) {
  var lyr = require('lyrics-fetcher');
  let argscmd = message.content.split("- ").slice(0);
  let artistUnClean = argscmd[0]; // yes, start at 0, not 1. I hate that too.
  var artistClean = artistUnClean.replace(".lyrics ", "");
  let song = argscmd[1]; // yes, start at 0, not 1. I hate that too.
  if (!artistClean) return message.reply("Please give me an artist name.");
  lyr.fetch(artistClean,  song, function (err, lyrics) {
      var lyricLength = lyrics.length;
      if (lyricLength > "2000") return message.reply("Sorry, That song is too large.\n Max length: 2000 Song Length: " + lyricLength);
        console.log("Running Command for Lyrics: Artist: " + artistClean + " Song: " + song + " Size: " + lyricLength);
        message.channel.send("\`\`\`" +  lyrics + "\`\`\`");
  });


}
