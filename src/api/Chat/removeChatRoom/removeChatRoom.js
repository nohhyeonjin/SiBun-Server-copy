import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation:{
        removeChatRoom:async(_,args,{request})=>{
            const { roomId } = args;
            
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

            const chatRoom = await prisma.deleteChatRoom({
                id : roomId
            });
            return "remove ChatRoom success";
        }
    }
}