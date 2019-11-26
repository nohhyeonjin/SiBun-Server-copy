import { prisma } from "../../../../generated/prisma-client";

const admin = require('firebase-admin');

export default{
    Mutation:{
        removeChatRoom:async(_,args,{request})=>{
            const { roomId } = args;
            const findChatRoom = await prisma.chatRoom({ id: roomId });
            const chatContentList = await prisma.chatContents({where : {chatRoom : {id : roomId}}});
            if(chatContentList.length > 0)
            {
                for(var i = 0; i < chatContentList.length; i++){ //관련되어 있는 chatContent 삭제
                    await prisma.deleteChatContent({
                        id: chatContentList[i].id
                    });
                }
                console.log("chatContent 삭제완료")
            }
            else{
                console.log("삭제할 chatContent가 없습니다.")
            }
     
            const roomOrder = await prisma.roomOrders({where : {chatRoom : {id : roomId}}}); 

            const individualOrderList =  await prisma.individualOrders({where : {roomOrder : {id : roomOrder[0].id}}}); 
            if ( individualOrderList.length > 0)
            {
                for(var j = 0; j < individualOrderList.length; j++){ //관련되어 있는 individualOrders 삭제
                    await prisma.deleteIndividualOrder({
                        id: individualOrderList[j].id
                    });
                }  
                console.log("individualOrder 삭제완료")
            }
            else{
                console.log("삭제할 individualOrder가 없습니다.")
            }
      
            await prisma.deleteRoomOrder({
                id: roomOrder[0].id
            });

            const storeName = await prisma.deleteChatRoom({
                id : roomId
            }).store().name();

            const storeOrder =  await prisma.storeOrder({chatRoom : {id : roomId}});
            if(storeOrder.length = 0){
                console.log("삭제할 StoreOrder가 없습니다.")
            }else{
                await prisma.deleteStoreOrder({where:{id: storeOrder.id}}); 
            }
           


            const message = [{
              notification: {
                title: `${storeName}`,
                body: `방이 삭제되었습니다`
              },
              topic: roomId
            }];
      
            admin.messaging().sendAll(message)
            .then((response) => {
              console.log('Successfully sent message:', response);
            })
            .catch((error) => {
              console.log('Error sending message:', error);
            });

            return findChatRoom;
        }
    }
}