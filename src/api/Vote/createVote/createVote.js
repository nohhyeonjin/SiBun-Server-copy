import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation:{
        createVote:async(_,args)=>{
            const { roomId } = args;
            const vote = await prisma.createVote({
                chatRoom : { connect : { id : roomId }}
            });   

            const memberList = await prisma.chatRoom({id:roomId}).memberList();

            for(var i = 0; i < memberList.length; i++){
             const userVote = await prisma.createUserVote({
                    user : { connect : memberList[i]},
                    choice : false,
                    vote : {connect : { id : vote.id }}
                });
            }

            return vote;
        } 
    } 
}
