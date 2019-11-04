import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation:{
        removeUserVote:async(_,args,{request})=>{
            const { userVoteId } = args;
            const userVote = await prisma.deleteUserVote({
                id : userVoteId
            });
            return userVote;
        }
    }
}