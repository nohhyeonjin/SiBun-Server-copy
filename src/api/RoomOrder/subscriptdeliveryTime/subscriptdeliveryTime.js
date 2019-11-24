import { prisma } from "../../../../generated/prisma-client";


// export default{
//     Subscription: {
//         subscriptdeliveryTime: {
//           subscribe: (_, { roomId }) => prisma.$subscribe.roomOrder({
//             mutation_in: ['UPDATED'],
//             node: 
//            // { chatRoom: {id: roomId}, deliveryTime: {notIn: 0}}
//            //{filter: {chatRoom: {id: roomId}, deliveryTime: {ne: 0}}}
//            { chatRoom: {id: roomId}, deliveryTime: 30}
//           }).node(),
//           resolve: payload => payload
//         }
//         }
// }

export default{
    Subscription: {
        subscriptdeliveryTime: {
            subscribe: (_, { roomId }) =>prisma.$subscribe.roomOrder({
                mutation_in: ['UPDATED'],node:{ chatRoom: {id: roomId}, 
                OR:[{ deliveryTime: 30},{deliveryTime:40},{deliveryTime:50},{deliveryTime:60},{deliveryTime:90},{deliveryTime:120} ]  
            }}).node(),resolve: payload => payload
        }
        }
}

