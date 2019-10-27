import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";

//���ο� chat ������ ģ��
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
  