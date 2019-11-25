import "./env";
import { GraphQLServer, PubSub } from "graphql-yoga";
import { prisma } from "../generated/prisma-client";
import logger from "morgan";
import schema from "./schema";
import utils from "./utils";    //utils.js���� import
import "./passport";    //passport.js���� import
import { authenticateJwt } from "./passport";

const admin = require('firebase-admin');
const serviceAccount = require('../sibun-client-1571132673181-firebase-adminsdk-www06-37767e001f.json');

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ 
    schema, 
    context: ({request})=>({request})   //context�� resolver ���̿��� ���� ���� �� �����?
  //  context: ({request})=>({request}), NEW_CHAT, pubsub   //context�� resolver ���̿��� ���� ���� �� �����?
});  

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://sibun-client-1571132673181.firebaseio.com'
});

server.express.use(logger("dev"));
server.express.use(authenticateJwt);
server.start({port: PORT}, () => console.log(`Server running on http://localhost:${PORT}`) );
