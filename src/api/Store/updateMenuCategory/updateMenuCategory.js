import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation: {
        updateMenuCategory: async(_, args)=>{
            const {storeId, name, newName}=args;

            const categoryFilterOptions = {
                AND: [ 
                    {store : {id : storeId }},
                    {name : name}
                ]
            };

            const getMenuCategory = await prisma.menuCategories({
                    where : categoryFilterOptions
                });

            const updateMenuCategory = await prisma.updateMenuCategory({
                data : { name : newName },
                where : { id : getMenuCategory[0].id }
            });
            return updateMenuCategory;
        }
    }
}