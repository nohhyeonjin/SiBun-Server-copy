import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";
import addIndividualOrder from "../addIndividualOrder/addIndividualOrder";

export default{
    Mutation:{
        updateIndividualOrder:async(_,args,{request})=>{
            isAuthenticated(request);
            const { roomId, menuList } = args;
            const { user } = request;
           
            const order = await prisma.chatRoom({ id: roomId }).roomOrder()
            .individualOrderList({ where: { user: { id: user.id } } });
            /*const existMenuList = await prisma.individualOrders({where : { id : orderId}}).menuList();
            
            console.log(existMenuList);
            console.log("0");
            console.log(existMenuList[0].menuList);

            const individualOrder = await prisma.updateIndividualOrder({
                data: {menuList : { disconnect : existMenuList[0].menuList[0]}},  //, menuList : {connect : newMenuList}
                where:  {id : orderId}
            });
            */
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
            const roomOrder = await prisma.roomOrders({where : {chatRoom:{id:roomId}}});
            const individualOrder = await prisma.createIndividualOrder({
                user : {connect : {id: user.id}},
                menuList : {connect : totalDetailIndividualOrderId},
                roomOrder : { connect : {id : roomOrder[0].id}}
            });
            await prisma.deleteIndividualOrder({id : order[0].id});

            return individualOrder;
        }
    }
}