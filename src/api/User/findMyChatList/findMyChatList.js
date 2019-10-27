import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default{
    Query:{
        findMyChatList:async(_,args,{request})=>{
            isAuthenticated(request);
            const { user } = request;
            const chatList=await prisma.user({id:user.id}).chatList();
            console.log(chatList);
            return chatList;
        }
    }
}