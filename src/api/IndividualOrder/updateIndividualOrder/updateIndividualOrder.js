import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";
import addIndividualOrder from "../addIndividualOrder/addIndividualOrder";

export default{
    Mutation:{
        updateIndividualOrder:async(_,args,{request})=>{
            isAuthenticated(request);
            const { roomId, orderId, menuList } = args;
            const { user } = request;
           
            /*const existMenuList = await prisma.individualOrders({where : { id : orderId}}).menuList();
            
            console.log(existMenuList);
            console.log("0");
            console.log(existMenuList[0].menuList);

            const individualOrder = await prisma.updateIndividualOrder({
                data: {menuList : { disconnect : existMenuList[0].menuList[0]}},  //, menuList : {connect : newMenuList}
                where:  {id : orderId}
            });
            */
            const roomOrder = await prisma.roomOrders({where : {chatRoom:{id:roomId}}});
            console.log(roomOrder[0]);
            console.log(menuList);
            const individualOrder = await prisma.createIndividualOrder({
                user : {connect : {id: user.id}},
                menuList : {connect : menuList},
                roomOrder : { connect : {id : roomOrder[0].id}}
            });
            await prisma.deleteIndividualOrder({id : orderId});

            return individualOrder;
        }
    }
}