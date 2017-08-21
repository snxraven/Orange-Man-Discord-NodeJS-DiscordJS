exports.run = function(client, message, args) {
  console.log("Active Processes");
  message.channel.send("Active Processes", {
    file: "http://grwh.ga:8080/monitorix/imgs/system2z.1day.png" // Or replace with FileOptions object


});


}
