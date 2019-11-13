import { prisma } from "../../../../generated/prisma-client";

export default{
Subscription: {
    subscriptChatRoom: {
      subscribe: () => 
      prisma.$subscribe.chatRoom({ mutation_in : ['CREATED','UPDATED']}).node(),resolve: payload => payload
      ||
      prisma.$subscribe.chatRoom({ mutation_in : ['DELETED']}).previousValues(),resolve: payload => payload
    }
  }
}