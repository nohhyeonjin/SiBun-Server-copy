import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation:{
        createMenuCategory:async(_,args)=>{
            const { storeId, name } = args;
            const menuCategory = await prisma.createMenuCategory({
                name: name,
                store : { connect : { id : storeId }}
            });   

            return menuCategory;
        } 
    } 
}
