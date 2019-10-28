import { prisma } from "../../../../generated/prisma-client";

//전체 chat 친구
export default{
  Query: {
      chatContents: async(_,args) => {
        const { roomId } = args;
        const contents = await prisma.chatContents({
          where : { chatRoom: { id: roomId } }
        })
          
        return contents;
      }
  }
}


