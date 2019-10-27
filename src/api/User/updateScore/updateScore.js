import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";

export default{
    Mutation: {
        updateScore: async(_, args,{request})=>{
            isAuthenticated(request);
            const {score}=args;
            const { user }=request;
            const updateUser = await prisma.updateUser({
                data : { score : score },
                where : { id : user.id }
            });
            return updateUser;
        }
    }
}