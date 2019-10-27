import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";

//새로운 chat 보내는 친구
  export default{
    Mutation:{
        sendChat: (_,args ,{ request }) =>{
          isAuthenticated(request);
          const { roomId , content } = args;
          const { user } = request;
          
          const sc = prisma.createChatContent({
            user: user,
            chatRoom: roomId,
            content: content
          })
          return "sendChat success"
        }
      } //chat
  }
  