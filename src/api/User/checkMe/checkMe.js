import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default{
    Query:{
        checkMe:async(_,args,{request})=>{
            isAuthenticated(request);
            const { user } = request;
            return user;
        }
    }
}