import { prisma } from "../../../../generated/prisma-client";

export default{
    Query:{
        getStoreId:async(_,args,{request})=>{
            const { id } = args;
            
            const store = await prisma.store({storeId : id});
            
            return store;
        }
    }
}