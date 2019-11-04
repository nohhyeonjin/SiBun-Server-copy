import { prisma } from "../../../../generated/prisma-client";


export default{
    Subscription: {
        subscriptVote: {
          subscribe: (_, { voteId }) => prisma.$subscribe.userVote({
            mutation_in: ['UPDATE'],
            node: { vote: {id: voteId} }
          }).node(),
          resolve: payload => payload
    
        }
      }
    }