import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";

const admin = require('firebase-admin');
// import { GraphQLServer, PubSub } from "graphql-yoga";

// const pubSub = new PubSub();

export default{
  Mutation:{
    sendChat:async(_,args ,{ request }) =>{
      isAuthenticated(request);
      const { roomId , content } = args;
      const { user } = request;

      const chatContent = await prisma.createChatContent({
        user: {connect : { id : user.id}},
        chatRoom: {connect : { id : roomId}},
        content: content
      });

      const storeName = await prisma.chatRoom({ id: roomId }).store().name();

      const message = [{
        notification: {
          title: `${storeName}`,
          body: `${content}`
        },
        topic: roomId
      }];

      admin.messaging().sendAll(message)
      .then((response) => {
        console.log('Successfully sent message:', response);
      })
      .catch((error) => {
        console.log('Error sending message:', error);
      });

      return "sendChat success"
    }
  } //chat
}