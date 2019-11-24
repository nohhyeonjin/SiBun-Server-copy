import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation:{
        setDeliveryTime:async(_,args,{request})=>{
            const { roomOrderId, deliveryTime } = args;
           
            const roomOrder = await prisma.updateRoomOrder({
                data: { deliveryTime },
                where:  {id : roomOrderId}
            });
        
            return roomOrder;
        }
    }
}