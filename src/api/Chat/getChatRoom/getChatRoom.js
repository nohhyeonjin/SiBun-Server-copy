import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    getChatRoom: async (_, args) => {
      const { roomId } = args;

      const chatRoom = await prisma.chatRoom({ id: roomId });

      return chatRoom;
    }
  }
}