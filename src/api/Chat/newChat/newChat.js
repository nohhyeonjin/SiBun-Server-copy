import { prisma } from "../../../../generated/prisma-client";

//새로운 chat 받는 친구
export default{
Subscription: {
    newChat: {
      subscribe: () => prisma.$subscribe.message().node(),
      resolve: payload => payload
    }
  }
}