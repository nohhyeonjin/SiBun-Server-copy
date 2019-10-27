import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    bossChatList: ({ id }) => prisma.user({ id }).bossChatList(),
    chatList: ({ id }) => prisma.user({ id }).chatList()
  }
}