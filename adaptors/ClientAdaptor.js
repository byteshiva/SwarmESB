/**
 * Created with JetBrains WebStorm.
 * User: sinica
 * Date: 6/8/12
 * Time: 10:52 PM
 * To change this template use File | Settings | File Templates.
 */

var redisHost;
var redisPort;
var thisAdaptor;
var serverPort      = 3000;

var sutil = require('swarmutil');

function ClientTcpServer(port,adaptor){
    console.log("Starting server on 3000");
    var net   	= require('net');
    this.server = net.createServer(
        function (socket){
            sutil.newOutlet(socket,thisAdaptor,loginCallback);
        }
    );
    this.server.listen(port);
};

var map = {};
function loginCallback(outlet){
    map[outlet.userId] = outlet;
}

findConnectedClientByUserId = function (userId){
    var o = map[userId];
    if(o != null && o != undefined){
        return o.sessionId;
    }
    //cprint("Error finding connection to user " + userId);
    return "Null*";
}

var net = require("net");

net.createServer(
    function(socket){
        writePolicy(socket);
    }
).listen(843);


process.on('message', function(m){
    //console.log('CHILD got message:', m);
    redisHost       = m.redisHost;
    redisPort       = m.redisPort;
    thisAdaptor     = sutil.createAdaptor("ClientAdaptor", redisHost, redisPort, m.shardId);
    thisAdaptor.loginSwarmingName = "login.js";
    new ClientTcpServer(serverPort);
});


