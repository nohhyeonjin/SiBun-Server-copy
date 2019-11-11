import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    getStoreList:async(_, args) => {
        const { storeCategoryName } = args;
        const storeList = await prisma.stores({where : {storeCategory : {name : storeCategoryName}}});
        return storeList;
    }
  }
}