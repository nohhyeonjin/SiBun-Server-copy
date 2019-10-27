import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation:{
        createChatRoom:async(_,args,{request})=>{
            isAuthenticated(request);
            const { storeName, location, time } = args;
            const { user } = request;
            const store = await prisma.store({name:storeName});

            const chatRoom = await prisma.createChatRoom({
                boss : { connect : { id : user.id }},
                memberList : { connect : { id : user.id }},
                store : { connect : { id : store.id }},
                location : location,
                orderExpectedTime : time,   //timeÇü½Ä ex) "2019-10-27T16:34:10"
                state : false
            });
            return chatRoom;
        }
    }
}