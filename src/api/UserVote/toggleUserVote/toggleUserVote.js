import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation:{
        toggleUserVote:async(_,args)=>{
            isAuthenticated(request);
            const { choice , userVoteId } = args;

            const userVote = await prisma.updateUserVote({
                data : { choice : choice},
                where : { id : userVoteId }
            });
            return userVote;
        } 
    } 
}