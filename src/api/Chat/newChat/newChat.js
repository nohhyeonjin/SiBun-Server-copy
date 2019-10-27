import { prisma } from "../../../../generated/prisma-client";

export default{
Subscription: {
    newChat: {
      subscribe: () => prisma.$subscribe.message().node(),
      resolve: payload => payload
    }
  }
}