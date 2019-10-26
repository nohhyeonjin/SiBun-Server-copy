import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation:{
        exitChatRoom:async(_,args,{request})=>{
            isAuthenticated(request);
            const { chatId } = args;    //args�� ���� chatId ����
            const { user } = request;
            const chat = await prisma.updateChatRoom({
                data : {memberList: { disconnect : { id : user.id}}},
                where : { id : chatId }
            })
            return chat;
        }
    }
}