import { prisma } from "../../../../generated/prisma-client";

//전체 chat 친구
  export default{
    Query: {
        chatContents: async(_,args) => {
          const chatRoomId = args;
          const contents = await prisma.chatContents({
          where : {chatRoom : chatRoomId},  
          })
            
          return contents;
        }
    }
}


