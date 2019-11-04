import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation:{
        createVote:async(_,args)=>{
            const { roomId } = args;
            const vote = await prisma.createVote({
                chatRoom : { connect : { id : roomId }}
            });
            return vote;
        } 
    } 
}