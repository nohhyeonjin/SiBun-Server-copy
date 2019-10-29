import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    bossChatList: ({ id }) => prisma.user({ id }).bossChatList(),
    chatList: ({ id }) => prisma.user({ id }).chatList(),
    isMe: (parent, _, { request }) => {
      const { id } = parent;
      const { user } = request;
      
      return id === user.id;
    }
  }
}