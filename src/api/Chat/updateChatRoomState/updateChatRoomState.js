import { prisma } from "../../../../generated/prisma-client";

const admin = require('firebase-admin');

export default{
    Mutation: {
        updateChatRoomState: async (_, args) => {
            const { roomId, state } = args;
            // state가 1이면 기본, 2이면 승낙 대기, 3이면 주문 승낙
            
            const chatRoom = await prisma.updateChatRoom({
                data : { state },
                where : { id : roomId }
            });
            const storeName = await prisma.chatRoom({ id: roomId }).store().name();
            
            var msg = "";
            if(state === 2) msg = "주문을 요청하였습니다";
            if(state === 3) msg = "주문이 승낙되었습니다";
            const message = [{
              notification: {
                title: `${storeName}`,
                body: msg
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

            return chatRoom;
        }
    }
}

