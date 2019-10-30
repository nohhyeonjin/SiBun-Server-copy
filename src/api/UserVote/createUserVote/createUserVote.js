import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation:{
        createUserVote:async(_,args,{request})=>{
            isAuthenticated(request);
            const { user } = request;
            const { choice , voteId } = args;

            const userVote = await prisma.createUserVote({
                user : { connect : { id : user.id }},
                choice : choice,
                vote : { connect : { id : voteId }}
            });
            return userVote;
        } 
    } 
}