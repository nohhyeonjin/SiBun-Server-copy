import { prisma } from "../../../../generated/prisma-client";


//  export const resolvers = {
//     Query: {
//         chatContent: () => prisma.chatContent()
//     },
//     Mutation: {
//       sendMessage: (_, { content }) =>
//         prisma.createChatContent({
//             content
//         })
//     },
//     Subscription: {
//       newMessage: {
//         subscribe: () => prisma.$subscribe.message().node(),
//         resolve: payload => payload
//       }
//     }
//   };

  export default{
    Mutation:{
        sendChat: (_, { content }) =>
          prisma.createChatContent({content})
      } //chat
  }

