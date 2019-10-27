import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";

//货肺款 chat 焊郴绰 模备
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
  