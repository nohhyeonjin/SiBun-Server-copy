import { prisma } from "../../../../generated/prisma-client";
//import {withFilter , PubSub} from 'graphql-yoga'
//MessageSubscription친구 역활
//새로운 chat 받는 친구


export default{
Subscription: {
    newChat: {
      subscribe: () => prisma.$subscribe.chatContent({mutation_in: ['CREATED']}).node(),
      resolve: payload => payload

    }
  }
}

