import { prisma } from "../../../../generated/prisma-client";

const admin = require('firebase-admin');

export default{
    Mutation:{
        setDeliveryTime: async (_, args) => {
            const { roomId, deliveryTime } = args;
           
            const roomOrderId = await prisma.updateChatRoom({
                data : { state: 4 },
                where : { id : roomId }
            }).roomOrder().id();
            const roomOrder = await prisma.updateRoomOrder({
                data: { deliveryTime },
                where:  { id : roomOrderId }
            });
            const storeName = await prisma.chatRoom({ id: roomId }).store().name();

            const message = [{
              notification: {
                title: `${storeName}`,
                body: `배달이 ${deliveryTime}분 안에 도착합니다`
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
        
            return roomOrder;
        }
    }
}