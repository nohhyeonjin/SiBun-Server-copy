import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    getRoomOrder: async (_, args) => {
      const { roomId } = args;

      const roomOrder = await prisma.roomOrder({ id: roomId });

      return roomOrder;
    }
  }
}