import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    getStoreList:async(_, args) => {
        const { storeCategoryId } = args;
        const storeList = await prisma.stores({where : {storeCategory : {id : storeCategoryId}}});
        return storeList;
    }
  }
}