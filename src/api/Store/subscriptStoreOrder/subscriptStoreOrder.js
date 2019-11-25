import { prisma } from "../../../../generated/prisma-client";

export default {
  Subscription: {
    subscriptStoreOrder: {
      subscribe: (_, { storeId }) => prisma.$subscribe.storeOrder({
        mutation_in: ['CREATED'],
        node: { store: { id: storeId } }
      }).node(),
      resolve: payload => payload
    }
  }
}