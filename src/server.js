import "./env";
import { GraphQLServer, PubSub } from "graphql-yoga";
import { prisma } from "../generated/prisma-client";
import logger from "morgan";
import schema from "./schema";
import utils from "./utils";    //utils.js���� import
import "./passport";    //passport.js���� import
import { authenticateJwt } from "./passport";

const admin = require('firebase-admin');
const serviceAccount = require('../sibun-client-1571132673181-firebase-adminsdk-www06-37767e001f.json')

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

server.express.get('/:token', function(req, res) {
  const message = {
      data: {
          score: '850',
          time: '2:45'
      },
      android: {
          ttl: 3600 * 1000, // 1 hour in milliseconds
          priority: 'normal',
          notification: {
              title: '$GOOG up 1.43% on the day',
              body: '$GOOG gained 11.80 points to close at 835.67, up 1.43% on the day.',
              color: '#f45342'
          }
      },
      token: req.params.token,
  };

  admin.messaging().send(message)
  .then((response) => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response);
  })
  .catch((error) => {
      console.log('Error sending message:', error);
  });
});

server.express.use(logger("dev"));
server.express.use(authenticateJwt);
server.start({port: PORT}, () => console.log(`Server running on http://localhost:${PORT}`) );
