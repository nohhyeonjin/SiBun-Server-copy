import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    getChatRoomList: (_, __) => {
      return prisma.chatRooms();
    }
  }
}