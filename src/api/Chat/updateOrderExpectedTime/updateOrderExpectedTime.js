import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation: {
        updateOrderExpectedTime:async(_,args,{request})=>{
            const { roomId, time } = args;
            
            const chatRoom = await prisma.updateChatRoom({
                data : { orderExpectedTime : time },
                where : { id : roomId }
            })
            return chatRoom;
        }
    }
}