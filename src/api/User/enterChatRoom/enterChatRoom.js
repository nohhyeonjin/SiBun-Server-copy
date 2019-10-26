import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation:{
        enterChatRoom:async(_,args,{request})=>{
            isAuthenticated(request);
            const { chatId } = args;    //args로 부터 chatId 받음
            const { user } = request;
            const chat = await prisma.updateChatRoom({
                data : {memberList: { connect : { id : user.id}}},
                where : { id : chatId}
            })
            return chat;
        }
    }
}