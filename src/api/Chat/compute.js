import { prisma } from "../../../generated/prisma-client";

export default {
  ChatRoom: {
    boss: ({ id }) => prisma.chatRoom({ id }).boss(),
    store: ({ id }) => prisma.chatRoom({ id }).store(),
    memberList: ({ id }) => prisma.chatRoom({ id }).memberList(),
    roomOrder: ({ id }) => prisma.chatRoom({ id }).roomOrder(),
    chatContentList: ({ id }) => prisma.chatRoom({ id }).chatContentList()
  },
  ChatContent: {
    user: ({ id }) => prisma.chatContent({ id }).user(),
    chatRoom: ({ id }) => prisma.chatContent({ id }).chatRoom()
  }
}