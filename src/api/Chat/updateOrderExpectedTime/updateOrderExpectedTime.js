<<<<<<< HEAD
=======
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
>>>>>>> 7736b08654f416e099a804dc17e1d8026372a6e8
