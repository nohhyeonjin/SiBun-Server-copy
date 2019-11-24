import { prisma } from "../../../../generated/prisma-client";


export default{
    Subscription: {
        subscriptStoreOrder: {
          subscribe: (_, { storeId }) => prisma.$subscribe.chatRoom({
            mutation_in: ['UPDATED'],
            node: { store: {id: storeId}, state: true }
          }).node(),
          resolve: payload => payload
        }
      }
    }