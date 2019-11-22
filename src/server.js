import "./env";
import { GraphQLServer, PubSub } from "graphql-yoga";
import { prisma } from "../generated/prisma-client";
import logger from "morgan";
import schema from "./schema";
import utils from "./utils";    //utils.js���� import
import "./passport";    //passport.js���� import
import { authenticateJwt } from "./passport";


const PORT = process.env.PORT || 4000;



const server = new GraphQLServer({ 
    schema, 
    context: ({request})=>({request})   //context�� resolver ���̿��� ���� ���� �� �����?
  //  context: ({request})=>({request}), NEW_CHAT, pubsub   //context�� resolver ���̿��� ���� ���� �� �����?
});  


server.express.use(logger("dev"));
server.express.use(authenticateJwt);
server.start({port: PORT}, () => console.log(`Server running on http://localhost:${PORT}`) );

var net = require('net');
net.createServer(function(socket){
    socket.write('hello\n');
    socket.end('world\n');
}).listen(8080,function(){
    console.log("Socket ON")
})