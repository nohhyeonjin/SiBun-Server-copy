import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default{
    Query:{
        checkUser:async(_,args,{request})=>{
            const {userId} = args;
            const user = await prisma.user({ id : userId});
            return user;
        }
    }
}