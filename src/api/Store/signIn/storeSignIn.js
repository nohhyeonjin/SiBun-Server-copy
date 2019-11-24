import { prisma } from "../../../../generated/prisma-client";
import {generateToken} from "../../../utils";

export default{
    Mutation:{
        storeSignIn:async(_,args,{request})=>{
            const { storeId, pwd }=args;   
            const isExistStore = await prisma.$exists.store({storeId});
            if(isExistStore==true){ 
                const store = await prisma.store({storeId});
                if(store.pwd==pwd){
                    const token = generateToken(store.id);
                    return token;
                }
            }else{
               return "SignIn Failed!!!"
            }
        }
    }
}