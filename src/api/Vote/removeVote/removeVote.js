import { prisma } from "../../../../generated/prisma-client";
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";

export default{
    Mutation:{
        removeVote:async(_,args,{request})=>{
            const { voteId } = args;

            const userVoteList = await prisma.userVotes({where : {vote : {id : voteId}}});
            for(var i = 0; i < userVoteList.length; i++){
                await prisma.deleteUserVote({
                    id: userVoteList[i].id
                });
            }
            const vote = await prisma.deleteVote({
                id : voteId
            });
            return vote;
        }
    }
}