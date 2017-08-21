exports.run = function(client, message, args) {
  console.log("Running Command for SysNet6");
  message.channel.send("Netstat statistics for Today - IVP6", {
    file: "http://grwh.ga:8080/monitorix/imgs/netstat2z.1day.png" // Or replace with FileOptions object


});


}
