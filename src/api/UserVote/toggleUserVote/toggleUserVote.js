import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation:{
        toggleUserVote:async(_,args)=>{
            isAuthenticated(request);
            const { userVoteId, choice } = args;

            const userVote = await prisma.updateUserVote({
                data : { choice : choice},
                where : { id : userVoteId }
            });
            return userVote;
        } 
    } 
}