import { prisma } from "../../../../generated/prisma-client";

// const NEW_CHAT = "NEW_CHAT";

//새로운 chat 받는 친구
export default{
Subscription: {
    newChat: {
      //subscribe: () => prisma.$subscribe.message().node(),
      //resolve: payload => payload
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(NEW_CHAT)
    }
  }
}