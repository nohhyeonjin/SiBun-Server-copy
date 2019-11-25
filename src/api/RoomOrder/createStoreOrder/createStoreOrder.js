import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation:{
        createStoreOrder:async(_,args,{request})=>{
            const { roomId, storeName, phoneNum, payType } = args;

            //get Type-StoreOrder address input value
            const chatRoom = await prisma.chatRoom({id:roomId});
            const address = chatRoom.location+" "+chatRoom.additionalLocation;
            console.log("-------address-------");
            console.log(address);

            //get individualOrderList
            const roomOrder = await prisma.chatRoom({id:roomId}).roomOrder();
            console.log("-------roomOrder-------");
            console.log(roomOrder);
            const iOrderList = await prisma.roomOrder({id:roomOrder.id}).individualOrderList();
            console.log("-------individual order List-------");
            console.log(iOrderList);
            
            //create detailIndividualOrderArray
            var dIOrderArray = new Array();
            var dIOrderCnt = 0;
            for(var i=0;i<iOrderList.length;i++){
                const dIOrderList = await prisma.detailIndividualOrders({where:{IndividualOrder:{id:iOrderList[i].id}}});
                for(var j=0;j<dIOrderList.length;j++){
                    dIOrderArray[dIOrderCnt]=dIOrderList[j];
                    dIOrderCnt++;
                }
            }
            console.log("-------detail individual order array-------");
            console.log(dIOrderArray);
            
            //get all menu and merge
            var mergedMenuArray = new Array();
            var mergedMenuCnt = 0;
            for(var i=0;i<dIOrderArray.length;i++){
                var menu = await prisma.detailIndividualOrder({id:dIOrderArray[i].id}).menu();
                console.log("+++menu+++");
                console.log(menu);
                var isExist = false;
                var idx = 0;
                for(var j=0;j<mergedMenuCnt;j++){
                    if(mergedMenuArray[j].id==menu.id){   //already menu exist
                        isExist = true;
                        idx=j;
                    }
                }
                if(isExist==false){ //menu doesn't exist in mergedMenuArray
                    var newMenu={id:menu.id, quantity:dIOrderArray[i].quantity, totalPrice:dIOrderArray[i].quantity*menu.price};
                    mergedMenuArray[mergedMenuCnt]=newMenu;
                    mergedMenuCnt++;
                }else{  //menu already exist in mergedMenuArray
                    mergedMenuArray[idx].quantity+=dIOrderArray[i].quantity;
                    mergedMenuArray[idx].totalPrice+=dIOrderArray[i].quantity*menu.price;
                }
            };
            console.log("-------merged menu array-------");
            console.log(mergedMenuArray);
            
            //create Type-TotalDetailIndividual
            var totalPrice=0;
            var totalDIArray=new Array();
            var totalDICnt=0;
            for(var i=0;i<mergedMenuCnt;i++){
                const totalDetailIndividual=await prisma.createTotalDetailIndividual({
                    menu : {connect:{id:mergedMenuArray[i].id}},
                    quantity : mergedMenuArray[i].quantity,
                    totalPrice : mergedMenuArray[i].totalPrice
                });
                totalDIArray[totalDICnt]={id:totalDetailIndividual.id};
                totalDICnt++;
                totalPrice+=mergedMenuArray[i].totalPrice;
            }
            console.log("-------TotalDetailIndividual Array-------");
            console.log(totalDIArray);

            const storeId = await prisma.store({ name: storeName }).id();
            //create Type-StoreOrder
            const storeOrder = await prisma.createStoreOrder({
                store:{connect:{id:storeId}},
                address:address,
                menuList: {connect : totalDIArray},
                totalPrice:totalPrice,
                chatRoom : {connect : {id : roomId}},
                phoneNum: phoneNum,
                payType : payType
            });
            return storeOrder;
            
        }
    }
}