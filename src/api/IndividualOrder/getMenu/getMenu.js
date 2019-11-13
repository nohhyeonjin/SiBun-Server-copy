import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        getMenu: async (_, args, { request }) => {
            const { storeName, menuCategoryName, menuName } = args;

            const store = await prisma.store({name : storeName});

            const categoryFilterOptions = {
                AND: [ 
                    {store : {id : store.id }},
                    {name : menuCategoryName}
                ]
            };

            const menuCategory = await prisma.menuCategories({where : categoryFilterOptions});
            
            const menuFilterOptions = {
                AND: [ 
                    {menuCategory : {id : menuCategory.id }},
                    {name : menuName}
                ]
            };

            const menu = await prisma.menus({where : menuFilterOptions});
            
            return menu[0];
        }
    }
}