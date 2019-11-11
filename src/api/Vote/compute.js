import { prisma } from "../../../generated/prisma-client";

export default {
  Vote: {
    chatRoom: ({ id }) => prisma.vote({ id }).chatRoom(),
    voteList: ({ id }) => prisma.vote({ id }).voteList()
  },
  UserVote : {
    user: ({ id }) => prisma.userVote({ id }).user(),
    vote: ({ id }) => prisma.userVote({ id }).vote()
  }
}