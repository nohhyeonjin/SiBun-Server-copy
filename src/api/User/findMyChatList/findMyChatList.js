import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default{
    Query:{
        findMyChatList:async(_,args,{request})=>{
            isAuthenticated(request);
            const { user } = request;
            //console.log(user);
            const useruser=await prisma.user({id:user.id});
            console.log(useruser);
            //console.log(useruser.chatList);
            return user.chatList;
        }
    }
}