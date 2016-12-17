var amqp = require('amqplib/callback_api');
var http = require('http');

//Lets define a port we want to listen to
const PORT = 3000;

//We need a function which handles requests and send response
function handleRequest(request, response) {
  amqp.connect(process.env.AMPQ_ADDRESS, function (err, conn) {
    if (err) {
      return console.log("ERROR", err);
    }
    conn.createChannel(function (err, ch) {
      var q = 'task_queue';
      var msg = process.argv.slice(2).join(' ') || "Hello World!";

      ch.assertQueue(q, { durable: true });
      ch.sendToQueue(q, new Buffer(msg), { persistent: true });
      console.log(" [x] Sent '%s'", msg);
    });
    setTimeout(function () { conn.close(); response.end('SENT') }, 500);;
  });
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function () {
  //Callback triggered when server is successfully listening. Hurray!
  console.log("Server listening on: http://localhost:%s", PORT);
});