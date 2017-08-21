exports.run = function(client, message, args) {
  console.log(" Devices interrupt activity");
  message.channel.send("Devices interrupt activity", {
    file: "http://grwh.ga:8080/monitorix/imgs/int1z.1day.png" // Or replace with FileOptions object


});


}
