import { prisma } from "../../../../generated/prisma-client";

export default{
  Subscription: {
    subscriptChatRoomCU: {
      subscribe: () => prisma.$subscribe.chatRoom({
        mutation_in: ['CREATED', 'UPDATED']
      }).node(),
      resolve: payload => payload
    }
}
}