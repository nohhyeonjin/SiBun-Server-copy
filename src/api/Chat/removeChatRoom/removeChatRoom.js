import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation:{
        removeChatRoom:async(_,args,{request})=>{
            const { roomId } = args;
            const chatRoom = await prisma.deleteChatRoom({
                id : roomId
            });
            return chatRoom;
        }
    }
}