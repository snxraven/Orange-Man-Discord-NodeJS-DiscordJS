exports.run = function(client, message, args) {
  console.log("Running Command for Sys");   
  message.channel.send("System load average and usage", {
    file: "http://grwh.ga:8080/monitorix/imgs/system1.1day.png" // Or replace with FileOptions object


});


}
