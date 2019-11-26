import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    getMenuList: async (_, args) => {
      const { storeId } = args;
      
      const menuCategoryList = await prisma.menuCategories({
        where : { store: { id: storeId } }
      });
      var totalMenuList = new Array();
      var totalMenuListCnt = 0;
      for(var i=0;i<menuCategoryList.length;i++){
        var menuList=await prisma.menus({where: {menuCategory: {id:menuCategoryList[i].id}}});
        for(var j=0;j<menuList.length;j++){
          var newMenu={id:menuList[j].id, name:menuList[j].name, price:menuList[j].price};
          totalMenuList[totalMenuListCnt]=newMenu;
          totalMenuListCnt++;
        }
      }
      return totalMenuList;
    }
  }
}