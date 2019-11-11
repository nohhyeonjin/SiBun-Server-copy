import { prisma } from "../../../../generated/prisma-client";

export default{
Subscription: {
    subscriptChatRoom: {
      subscribe: () => prisma.$subscribe.chatRoom({
        mutation_in: ['CREATED']
      }).node(),
      resolve: payload => payload
    }
  }
}