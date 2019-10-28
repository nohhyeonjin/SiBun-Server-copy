import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";
// import PubSub from 'pubsub-js';

// const pubsub = new PubSub();
// const NEW_CHAT = "NEW_CHAT";


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
          })

          return "sendChat success"
        }
        
      } //chat
  }
