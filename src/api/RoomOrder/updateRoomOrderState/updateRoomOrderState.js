import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation:{
        updateRoomOrderState:async(_,args,{request})=>{
            const { roomOrderId, state } = args;
           
            const roomOrder = await prisma.updateRoomOrder({
                data: { state },
                where:  {id : roomOrderId}
            });
        
            return roomOrder;
        }
    }
}