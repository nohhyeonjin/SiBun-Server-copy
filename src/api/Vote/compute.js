import { prisma } from "../../../generated/prisma-client";

export default {
  ChatRoom: {
    boss: ({ id }) => prisma.chatRoom({ id }).boss(),
    store: ({ id }) => prisma.chatRoom({ id }).store(),
    memberList: ({ id }) => prisma.chatRoom({ id }).memberList(),
    roomOrder: ({ id }) => prisma.chatRoom({ id }).roomOrder(),
    chatContentList: ({ id }) => prisma.chatRoom({ id }).chatContentList()
  },
  Vote: {
    chatRoom: ({ id }) => prisma.chatRoom({ id }).chatRoom(),
    voteList: ({ id }) => prisma.voteList({ id }).voteList()
  },
  UserVote : {
    user: ({ id }) => prisma.user({ id }).user(),
    vote: ({ id }) => prisma.vote({ id }).vote()
  }
}