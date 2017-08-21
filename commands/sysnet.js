exports.run = function(client, message, args) {
  console.log("Running Command for SysNet");
  message.channel.send("Netstat statistics for today - IVP4", {
    file: "http://grwh.ga:8080/monitorix/imgs/netstat1z.1day.png" // Or replace with FileOptions object


});


}
