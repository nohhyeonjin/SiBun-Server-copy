import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    getRoomOrder: async (_, args) => {
      const { roomId } = args;

      const roomOrder = await prisma.chatRoom({ id: roomId }).roomOrder();

      return roomOrder;
    }
  }
}