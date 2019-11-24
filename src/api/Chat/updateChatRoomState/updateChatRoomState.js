import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation: {
        updateChatRoomState:async(_,args,{request})=>{
            isAuthenticated(request);
            const {roomId} = args;
            
            const chatRoom = await prisma.updateChatRoom({
                data : { state : true },
                where : { id : roomId }
            })
            return chatRoom;
        }
    }
}

