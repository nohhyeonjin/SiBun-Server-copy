import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    getMenuCategoryList: async (_, args) => {
      const { storeId } = args;
      
      const menuCategories = await prisma.menuCategories({
        where : { store: { id: storeId } }
      });

      return menuCategories;
    }
  }
}