import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation:{
        addIndividualOrder:async(_,args,{request})=>{
            isAuthenticated(request);
            const { roomId, menuList } = args;
            const { user } = request;
 
            const roomOrder = await prisma.roomOrders({where : {chatRoom:{id:roomId}}});
            const individualOrder = await prisma.createIndividualOrder({
                user : {connect : {id: user.id}},
                menuList : {connect : menuList},
                roomOrder : { connect : {id : roomOrder[0].id}}
            });
            
            return individualOrder;
            
        }
    }
}