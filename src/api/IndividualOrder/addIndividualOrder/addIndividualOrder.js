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
            var totalDetailIndividualOrderId = new Array();
            for(var i=0;i<totalDetailIndividualOrder.length;i++){
                totalDetailIndividualOrderId[i]={ id : totalDetailIndividualOrder[i].id};
            }
            console.log(totalDetailIndividualOrderId);

            const roomOrder = await prisma.roomOrders({where : {chatRoom:{id:roomId}}});
            const individualOrder = await prisma.createIndividualOrder({
                user : {connect : {id: user.id}},
                menuList : {connect : totalDetailIndividualOrderId},
                roomOrder : { connect : {id : roomOrder[0].id}}
            });
            
            return individualOrder;
            
        }
    }
}