import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation:{
        addIndividualOrder:async(_,args,{request})=>{
            isAuthenticated(request);
            const { roomId, menuList } = args;
            const { user } = request;
 
            var totalDetailIndividualOrder = new Array();
            for(var i=0;i<menuList.length;i++){
                const DetailIndividualOrder = await prisma.createDetailIndividualOrder({
                    menu: { connect : {id : menuList[i].id} },
                    quantity : menuList[i].quantity
                });
                totalDetailIndividualOrder[i]=DetailIndividualOrder;
            }
            const roomOrder = await prisma.roomOrders({where : {chatRoom:{id:roomId}}});
            const individualOrder = await prisma.createIndividualOrder({
                user : {connect : {id: user.id}},
                menuList : {connect : totalDetailIndividualOrder.id },
                roomOrder : { connect : {id : roomOrder[0].id}}
            });
            
            return individualOrder;
            
        }
    }
}