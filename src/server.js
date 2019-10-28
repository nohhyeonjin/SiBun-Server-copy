import "./env";
import { GraphQLServer } from "graphql-yoga";
import { prisma } from "../generated/prisma-client";
import logger from "morgan";
import schema from "./schema";
import utils from "./utils";    //utils.js���� import
import "./passport";    //passport.js���� import
import { authenticateJwt } from "./passport";
// import PubSub from 'pubsub-js';

// const pubsub = new PubSub();

// const NEW_CHAT = "NEW_CHAT";

const PORT = process.env.PORT || 4000;



const server = new GraphQLServer({ 
    schema, 
    context: ({request})=>({request})   //context�� resolver ���̿��� ���� ���� �� �����
  //  context: ({request})=>({request}), NEW_CHAT, pubsub   //context�� resolver ���̿��� ���� ���� �� �����
});  


server.express.use(logger("dev"));
server.express.use(authenticateJwt);
server.start({port: PORT}, () => console.log(`Server running on http://localhost:${PORT}`) );