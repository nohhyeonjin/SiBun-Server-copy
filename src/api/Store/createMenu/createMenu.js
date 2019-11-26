import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createMenu: async (_, args) => {
      const { storeId, menuCategoryName, menuName, menuPrice } = args;
      const filterOptions = {
          AND: [
              {name : menuCategoryName},
              {store : {id: storeId}}
          ]
      };

      //선택된 메뉴카테고리의 이름과 storeId로 메뉴카테고리 찾아오기
      const menuCategory=await prisma.menuCategories({where:filterOptions});
      console.log(menuCategory);

      //createMenu
      const menu=await prisma.createMenu({
          name:menuName,
          price:menuPrice,
          menuCategory:{connect:{id:menuCategory[0].id}}
      });
      return menu;
    }
  }
}