import { prisma } from "../../../../generated/prisma-client";
//import {withFilter , PubSub} from 'graphql-yoga'
//MessageSubscription친구 역활
//새로운 chat 받는 친구


export default{
Subscription: {
    newChat: {
      subscribe: (_, { roomId }) => prisma.$subscribe.chatContent({
        mutation_in: ['CREATED'],
        node: { chatRoom: {id: roomId} }
      }).node(),
      resolve: payload => payload

    }
  }
}