var exp = require("express");
var app = exp();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);



// делаем папку клиента публичной что бы было возможно получить оттуда клиентские скрипты
app.use(exp.static('client'));
app.get('/', (req, res) => 
{
	console.log(req.url);
	res.sendFile(__dirname + '/client/client.html');
});

// message history
var msgs = [];
// handle clients logic
var clients = [];
io.on('connection', (client) => 
{
  for(i = 0; i < msgs.length; i++)
    client.send(msgs[i]);

  clients.push(client);
  console.log("Client connected: " + client.id);

  client.on("message", (msg) =>
  {
    msgs.push(msg);
    for(i = 0; i < clients.length; i++)
    {
      if(clients[i] != client)
        clients[i].send(msg);
    }

    console.log(client.id.substring(0, 5) + ": " + msg);
  });

});

var PORT = process.env.PORT || 80;
server.listen(PORT, () => 
{
  console.log('listening on *:' + PORT);
});