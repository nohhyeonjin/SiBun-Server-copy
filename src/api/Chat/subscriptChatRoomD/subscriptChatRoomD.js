import { prisma } from "../../../../generated/prisma-client";

export default{
Subscription: {
    subscriptChatRoomD: {
      subscribe: () => prisma.$subscribe.chatRoom({
        mutation_in: ['DELETED', 'UPDATED']
      }).previousValues(),
      resolve: payload => payload
    }
}
}