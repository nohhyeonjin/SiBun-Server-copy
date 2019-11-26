import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

const admin = require('firebase-admin');

export default{
    Mutation: {
        updateOrderExpectedTime: async(_, args, { request })=>{
            isAuthenticated(request);
            const { roomId, time } = args;
            
            const chatRoom = await prisma.updateChatRoom({
                data : { orderExpectedTime : time },
                where : { id : roomId }
            });

            const storeName = await prisma.chatRoom({ id: roomId }).store().name();
            const bossId = await prisma.chatRoom({ id: roomId }).boss().id();

            const message = [{
              data: {
                roomId,
                storeName,
                bossId,
                state: chatRoom.state+""
              },
              notification: {
                title: `${storeName}`,
                body: `주문 시간이 ${time.substr(11,5)}으로 변경됨`
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

