import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    getStoreOrderList: async (_, args) => {
      const { storeId } = args;
      
      const storeOrders = await prisma.storeOrders({
        where : { store: { id: storeId } }
      });

      return storeOrders;
    }
  }
}