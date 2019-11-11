import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    getStoreMenu:async(_, args) => {
        const { storeName } = args;
        const menuCategoryList = await prisma.store({name : storeName}).menuCategoryList();
        var totalMenuList = new Array();
        var count = 0;
        for(var i=0; i<menuCategoryList.length;i++){
            const menuList = await prisma.menus({where:{menuCategory:{id:menuCategoryList[i].id}}});
            for(var j=0;j<menuList.length;j++){
                totalMenuList[count]=menuList[j];
                count++;
            }
        }
        return totalMenuList;
    }
  }
}