import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";
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
          })

          return "sendChat success"
        }
        
        
      } //chat
  }

