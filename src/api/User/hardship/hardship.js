import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";
import {sendHardshipMail} from "../../../utils";

export default{
    Mutation:{
        hardship:async(_,args,{request})=>{
            isAuthenticated(request);
            const { userId, content} = args;
            const { user } = request;

            const toUserId = userId;
            const fromUserId = user.id;

            sendHardshipMail(fromUserId, toUserId, content);

            await prisma.updateUser({
                data : { hardshipState : true },
                where : { id : toUserId }
            });
        }
    }
}