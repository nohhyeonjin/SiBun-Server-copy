import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation:{
        removeVote:async(_,args,{request})=>{
            const { voteId } = args;
            const vote = await prisma.deleteVote({
                id : voteId
            });
            return vote;
        }
    }
}