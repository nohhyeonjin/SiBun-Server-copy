import { prisma } from "../../../../generated/prisma-client";

//새로운 chat 보내는 친구
  export default{
    Mutation:{
        sendChat: (_, { content }) =>
          prisma.createChatContent({content})
      } //chat
  }

//시간 바꾸는 거 참고하기1!
//   export default{
//     Mutation: {
//         updateOrderExpectedTime:async(_,args,{request})=>{
//             const { roomId, time } = args;
            
//             const chatRoom = await prisma.updateChatRoom({
//                 data : { orderExpectedTime : time },
//                 where : { id : roomId }
//             })
//             return chatRoom;
//         }
//     }
// }